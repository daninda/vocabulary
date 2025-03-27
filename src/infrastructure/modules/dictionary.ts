import { IDictionaryRepository } from '@application/repositories/dictionary.interface';
import { DictionaryController } from '@infrastructure/controllers/dictionary';
import { RepositoriesModule } from '@infrastructure/data/postgres/repositories.module';
import { DictionaryRepository } from '@infrastructure/data/postgres/repositories/dictionary';
import { Module } from '@nestjs/common';
import { CreateDictionaryUseCase } from '@usecases/dictionary/create.usecase';
import { FindAllDictionaryUseCase } from '@usecases/dictionary/find-all.usecase';
import { FindByIdDictionaryUseCase } from '@usecases/dictionary/find-by-id.usecase';

import { AuthModule } from './auth';

@Module({
  imports: [RepositoriesModule, AuthModule],
  controllers: [DictionaryController],
  providers: [
    CreateDictionaryUseCase,
    FindAllDictionaryUseCase,
    FindByIdDictionaryUseCase,
    { provide: IDictionaryRepository, useClass: DictionaryRepository },
  ],
})
export class DictionaryModule {}
