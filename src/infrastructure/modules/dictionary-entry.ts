import { IDictionaryEntryRepository } from '@application/repositories/dictionary-entry.interface';
import { ITestStatisticRepository } from '@application/repositories/test-statistic.interface';
import { RatingUpdateSchedule } from '@application/schedules/rating-update';
import { IYaDictionaryService } from '@application/services/ya-dictionary.interface';
import { DictionaryEntryController } from '@infrastructure/controllers/dictionary-entry';
import { RepositoriesModule } from '@infrastructure/data/postgres/repositories.module';
import { DictionaryEntryRepository } from '@infrastructure/data/postgres/repositories/dictionary-entry';
import { TestStatisticRepository } from '@infrastructure/data/postgres/repositories/test-statistic';
import { YaDictionaryService } from '@infrastructure/services/ya-dictionary';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ChangeDictionaryDictionaryEntryUseCase } from '@usecases/dictionary-entry/change-dictionary.usecase';
import { CheckExistingDictionaryEntryUseCase } from '@usecases/dictionary-entry/check-existence.usecase';
import { CreateDictionaryEntryUseCase } from '@usecases/dictionary-entry/create.usecase';
import { DeleteDictionayEntryUsecase } from '@usecases/dictionary-entry/delete.usecase';
import { FindAllDictionaryEntryUseCase } from '@usecases/dictionary-entry/find-all.usecase';
import { FindByIdDictionayEntryUsecase } from '@usecases/dictionary-entry/find-by-id.usecase';
import { LookupDictionaryEntryUsecase } from '@usecases/dictionary-entry/lookup.usecase';
import { RatingDownDictionaryEntryUsecase } from '@usecases/dictionary-entry/rating-down.usecase';
import { RatingUpDictionaryEntryUsecase } from '@usecases/dictionary-entry/rating-up.usecase';

import { AuthModule } from './auth';

@Module({
  imports: [RepositoriesModule, AuthModule, ConfigModule],
  controllers: [DictionaryEntryController],
  providers: [
    RatingUpdateSchedule,

    CreateDictionaryEntryUseCase,
    FindAllDictionaryEntryUseCase,
    FindByIdDictionayEntryUsecase,
    ChangeDictionaryDictionaryEntryUseCase,
    DeleteDictionayEntryUsecase,
    RatingUpDictionaryEntryUsecase,
    RatingDownDictionaryEntryUsecase,
    LookupDictionaryEntryUsecase,
    CheckExistingDictionaryEntryUseCase,
    {
      provide: IDictionaryEntryRepository,
      useClass: DictionaryEntryRepository,
    },
    {
      provide: ITestStatisticRepository,
      useClass: TestStatisticRepository,
    },
    {
      provide: IYaDictionaryService,
      useClass: YaDictionaryService,
    },
  ],
})
export class DictionaryEntryModule {}
