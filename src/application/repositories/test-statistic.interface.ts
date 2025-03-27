import { TestStatistic } from '@domain/test-statistic';
import { TestStatisticPointDto } from '@dtos/test-statistic/test-statistic-point.dto';

export abstract class ITestStatisticRepository {
  abstract save(dictionaryEntry: TestStatistic): Promise<TestStatistic>;
  abstract calcStatistic(
    userId: string,
    dictionaryId?: string,
    interval?: string,
  ): Promise<TestStatisticPointDto[]>;
}
