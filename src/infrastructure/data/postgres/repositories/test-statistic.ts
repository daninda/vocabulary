import { ITestStatisticRepository } from '@application/repositories/test-statistic.interface';
import { TestStatistic } from '@domain/test-statistic';
import { TestStatisticPointDto } from '@dtos/test-statistic/test-statistic-point.dto';
import { DictionaryEntryEntity } from '@infrastructure/data/postgres/entities/dictionary-entry';
import { TestStatisticEntity } from '@infrastructure/data/postgres/entities/test-statistic';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TestStatisticRepository implements ITestStatisticRepository {
  constructor(
    @InjectRepository(TestStatisticEntity)
    private testStatisticRepository: Repository<TestStatisticEntity>,
    @InjectRepository(DictionaryEntryEntity)
    private dictionaryEntryRepository: Repository<DictionaryEntryEntity>,
  ) {}

  async save(testStatistic: TestStatistic): Promise<TestStatistic> {
    const testStatisticEntity = this.toTestStatisticEntity(testStatistic);

    const savedtestStatisticEntity = await this.testStatisticRepository.save({
      ...testStatisticEntity,
      dictionaryEntry: { id: testStatistic.dictionaryEntryId },
    });

    return this.toTestStatistic(savedtestStatisticEntity);
  }

  async calcStatistic(
    userId: string,
    dictionaryId?: string,
    interval?: string,
  ): Promise<TestStatisticPointDto[]> {
    const intervalType =
      interval === 'day'
        ? 'hour'
        : interval === 'week'
          ? 'day'
          : interval === 'month'
            ? 'day'
            : 'month';

    const timeFilter =
      interval === 'day'
        ? "NOW() - INTERVAL '1 day'"
        : interval === 'week'
          ? "NOW() - INTERVAL '7 days'"
          : interval === 'month'
            ? "NOW() - INTERVAL '1 month'"
            : "NOW() - INTERVAL '1 year'";

    const addedCountQuery = this.dictionaryEntryRepository
      .createQueryBuilder('dictionary_entry')
      .select([
        `DATE_TRUNC(:intervalType, dictionary_entry.createAt) as "date"`,
        `COUNT(dictionary_entry.id) as "addedCount"`,
      ])
      .leftJoin('dictionary_entry.dictionary', 'dictionary')
      .where(`dictionary_entry.createAt >= ${timeFilter}`)
      .andWhere('dictionary.user = :userId', { userId })
      .groupBy(`DATE_TRUNC(:intervalType, dictionary_entry.createAt)`)
      .setParameter('intervalType', intervalType);

    if (dictionaryId) {
      addedCountQuery.andWhere('dictionary_entry.dictionary = :dictionaryId', {
        dictionaryId,
      });
    }

    const addedCountResult = await addedCountQuery.getRawMany();

    const statsQuery = this.testStatisticRepository
      .createQueryBuilder('test_statistic')
      .select([
        `DATE_TRUNC(:intervalType, test_statistic.createAt) as "date"`,
        `SUM(CASE WHEN test_statistic.isRight IS NOT NULL THEN 1 ELSE 0 END) as "passedCount"`,
        `SUM(CASE WHEN test_statistic.isRight = true THEN 1 ELSE 0 END) as "rightCount"`,
        `SUM(CASE WHEN test_statistic.isRight = false THEN 1 ELSE 0 END) as "wrongCount"`,
      ])
      .leftJoin('test_statistic.dictionaryEntry', 'dictionary_entry')
      .leftJoin('dictionary_entry.dictionary', 'dictionary')
      .where(`test_statistic.createAt >= ${timeFilter}`)
      .andWhere('dictionary.user = :userId', { userId })
      .groupBy(`DATE_TRUNC(:intervalType, test_statistic.createAt)`)
      .setParameter('intervalType', intervalType);

    if (dictionaryId) {
      statsQuery.andWhere('dictionary_entry.dictionary = :dictionaryId', {
        dictionaryId,
      });
    }

    const statsResult = await statsQuery.getRawMany();

    const mergedData = new Map<string, TestStatisticPointDto>();

    for (const row of addedCountResult) {
      const dateKey = new Date(row.date).toISOString();
      mergedData.set(dateKey, {
        addedCount: Number(row.addedCount),
        passedCount: 0,
        rightCount: 0,
        wrongCount: 0,
        date: new Date(row.date),
      });
    }

    for (const row of statsResult) {
      const dateKey = new Date(row.date).toISOString();
      if (mergedData.has(dateKey)) {
        const existing = mergedData.get(dateKey)!;
        existing.passedCount = Number(row.passedCount);
        existing.rightCount = Number(row.rightCount);
        existing.wrongCount = Number(row.wrongCount);
      } else {
        mergedData.set(dateKey, {
          addedCount: 0,
          passedCount: Number(row.passedCount),
          rightCount: Number(row.rightCount),
          wrongCount: Number(row.wrongCount),
          date: new Date(row.date),
        });
      }
    }

    return Array.from(mergedData.values()).sort(
      (a, b) => a.date.getTime() - b.date.getTime(),
    );
  }

  private toTestStatisticEntity(
    testStatistic: TestStatistic,
  ): TestStatisticEntity {
    const testStatisticEntity: TestStatisticEntity = new TestStatisticEntity();
    testStatisticEntity.id = testStatistic.id;
    testStatisticEntity.isRight = testStatistic.isRight;
    testStatisticEntity.createAt = testStatistic.createAt;

    return testStatisticEntity;
  }

  private toTestStatistic(
    testStatisticEntity: TestStatisticEntity,
  ): TestStatistic {
    const testStatistic: TestStatistic = new TestStatistic(
      testStatisticEntity.id,
      testStatisticEntity.dictionaryEntry.id,
      testStatisticEntity.isRight,
      testStatisticEntity.createAt,
    );

    return testStatistic;
  }
}
