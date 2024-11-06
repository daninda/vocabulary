import { IDictionaryEntryRepository } from '@application/repositories/dictionary-entry.interface';
import { Test } from '@domain/test';
import { Injectable } from '@nestjs/common';
import { Result } from '@shared/utils/result';

import { CreateTestUseCase } from './create.usecase';

@Injectable()
export class GenerateTestUseCase {
  constructor(
    private readonly dictionaryEntryRepository: IDictionaryEntryRepository,
    private readonly createTestUseCase: CreateTestUseCase,
  ) {}

  async execute(
    dictionaryId: string,
    wrongsCount: number,
  ): Promise<Result<Test>> {
    const dictionaryEntry =
      await this.dictionaryEntryRepository.findForTestByDictionary(
        dictionaryId,
      );

    if (!dictionaryEntry) {
      return Result.failure('No more tests');
    }

    const test = this.createTestUseCase.execute(dictionaryEntry, wrongsCount);

    if (!test.isSuccess) {
      return test;
    }

    return Result.success(test.value);
  }
}
