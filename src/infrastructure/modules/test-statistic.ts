import { ITestStatisticRepository } from '@application/repositories/test-statistic.interface';
import { TestStatisticController } from '@infrastructure/controllers/test-statistic';
import { RepositoriesModule } from '@infrastructure/data/postgres/repositories.module';
import { TestStatisticRepository } from '@infrastructure/data/postgres/repositories/test-statistic';
import { Module } from '@nestjs/common';
import { CalcStatisticUseCase } from '@usecases/test-statistic/calc-statistic.usecase';

import { AuthModule } from './auth';

@Module({
  imports: [RepositoriesModule, AuthModule],
  controllers: [TestStatisticController],
  providers: [
    CalcStatisticUseCase,
    { provide: ITestStatisticRepository, useClass: TestStatisticRepository },
  ],
})
export class TestStatisticModule {}
