import { IDictionaryEntryRepository } from '@application/repositories/dictionary-entry.interface';
import { TestController } from '@infrastructure/controllers/test';
import { Module } from '@nestjs/common';
import { RepositoriesModule } from '@postgres/repositories.module';
import { DictionaryEntryRepository } from '@postgres/repositories/dictionary-entry';
import { CreateTestUseCase } from '@usecases/test/create.usecase';
import { GenerateTestUseCase } from '@usecases/test/generate.usecase';

import { AuthModule } from './auth';

@Module({
  imports: [RepositoriesModule, AuthModule],
  controllers: [TestController],
  providers: [
    CreateTestUseCase,
    GenerateTestUseCase,
    {
      provide: IDictionaryEntryRepository,
      useClass: DictionaryEntryRepository,
    },
  ],
})
export class TestModule {}
