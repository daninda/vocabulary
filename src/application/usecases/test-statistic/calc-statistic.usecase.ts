import { ITestStatisticRepository } from '@application/repositories/test-statistic.interface';
import { TestStatisticPointDto } from '@dtos/test-statistic/test-statistic-point.dto';
import { Injectable } from '@nestjs/common';
import { Result } from '@shared/utils/result';

@Injectable()
export class CalcStatisticUseCase {
  constructor(
    private readonly testStatisticRepository: ITestStatisticRepository,
  ) {}

  async execute(
    userId: string,
    dictionaryId?: string,
    interval?: string,
  ): Promise<Result<TestStatisticPointDto[]>> {
    const testStatistics = await this.testStatisticRepository.calcStatistic(
      userId,
      dictionaryId,
      interval,
    );

    return Result.success(testStatistics);
  }
}
