import {
  CalcStatisticInput,
  CalcStatisticOutput,
} from '@dtos/test-statistic/calc-statistic.dto';
import { UserId } from '@infrastructure/decorators/user-id';
import { AuthGuard } from '@infrastructure/guards/auth';
import {
  BadRequestException,
  Controller,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CalcStatisticUseCase } from '@usecases/test-statistic/calc-statistic.usecase';

@UseGuards(AuthGuard)
@Controller('test-statistic')
export class TestStatisticController {
  constructor(private readonly calcStatisticUseCase: CalcStatisticUseCase) {}

  @Get()
  async calcStatistic(
    @Query() dto: CalcStatisticInput,
    @UserId() userId: string,
  ): Promise<CalcStatisticOutput> {
    const result = await this.calcStatisticUseCase.execute(
      userId,
      dto.dictionaryId,
      dto.interval,
    );

    if (!result.isSuccess) {
      throw new BadRequestException(result.error);
    }

    return result.value;
  }
}
