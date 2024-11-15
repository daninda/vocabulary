import { IDictionaryEntryRepository } from '@application/repositories/dictionary-entry.interface';
import { IYaDictionaryService } from '@application/services/ya-dictionary.interface';
import { DictionaryEntryController } from '@infrastructure/controllers/dictionary-entry';
import { YaDictionaryService } from '@infrastructure/services/ya-dictionary';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RepositoriesModule } from '@postgres/repositories.module';
import { DictionaryEntryRepository } from '@postgres/repositories/dictionary-entry';
import { ChangeDictionaryDictionaryEntryUseCase } from '@usecases/dictionary-entry/change-dictionary.usecase';
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
    CreateDictionaryEntryUseCase,
    FindAllDictionaryEntryUseCase,
    FindByIdDictionayEntryUsecase,
    ChangeDictionaryDictionaryEntryUseCase,
    DeleteDictionayEntryUsecase,
    RatingUpDictionaryEntryUsecase,
    RatingDownDictionaryEntryUsecase,
    LookupDictionaryEntryUsecase,
    {
      provide: IDictionaryEntryRepository,
      useClass: DictionaryEntryRepository,
    },
    {
      provide: IYaDictionaryService,
      useClass: YaDictionaryService,
    },
  ],
})
export class DictionaryEntryModule {}
