import { IDictionaryEntryRepository } from '@application/repositories/dictionary-entry.interface';
import { ITestStatisticRepository } from '@application/repositories/test-statistic.interface';
import { DictionaryEntry } from '@domain/dictionary-entry';
import { TestStatistic } from '@domain/test-statistic';
import { Injectable } from '@nestjs/common';
import { Result } from '@shared/utils/result';

@Injectable()
export class RatingUpDictionaryEntryUsecase {
  constructor(
    private readonly dictionaryEntryRepository: IDictionaryEntryRepository,
    private readonly testStatisticRepository: ITestStatisticRepository,
  ) {}

  async execute(id: string): Promise<Result<DictionaryEntry>> {
    const dictionaryEntry = await this.dictionaryEntryRepository.changeRating(
      id,
      1,
    );

    const testStatistic = TestStatistic.create(id, true);
    await this.testStatisticRepository.save(testStatistic);

    return Result.success(dictionaryEntry);
  }
}
