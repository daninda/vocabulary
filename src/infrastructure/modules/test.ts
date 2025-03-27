import { IDictionaryEntryRepository } from '@application/repositories/dictionary-entry.interface';
import { TestController } from '@infrastructure/controllers/test';
import { RepositoriesModule } from '@infrastructure/data/postgres/repositories.module';
import { DictionaryEntryRepository } from '@infrastructure/data/postgres/repositories/dictionary-entry';
import { Module } from '@nestjs/common';
import { CreateTestUseCase } from '@usecases/test/create.usecase';
import { GenerateTestUseCase } from '@usecases/test/generate.usecase';
import { GenerateWordWithErrorTestUseCase } from '@usecases/test/generate-word-with-error.usecase';

import { AuthModule } from './auth';

@Module({
  imports: [RepositoriesModule, AuthModule],
  controllers: [TestController],
  providers: [
    CreateTestUseCase,
    GenerateTestUseCase,
    GenerateWordWithErrorTestUseCase,
    {
      provide: IDictionaryEntryRepository,
      useClass: DictionaryEntryRepository,
    },
  ],
})
export class TestModule {}
