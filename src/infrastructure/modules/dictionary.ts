import { IDictionaryRepository } from '@application/repositories/dictionary.interface';
import { DictionaryController } from '@infrastructure/controllers/dictionary';
import { Module } from '@nestjs/common';
import { RepositoriesModule } from '@postgres/repositories.module';
import { DictionaryRepository } from '@postgres/repositories/dictionary';
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
