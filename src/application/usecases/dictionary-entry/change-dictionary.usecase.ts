import { IDictionaryEntryRepository } from '@application/repositories/dictionary-entry.interface';
import { DictionaryEntry } from '@domain/dictionary-entry';
import { Injectable } from '@nestjs/common';
import { Result } from '@shared/utils/result';

@Injectable()
export class ChangeDictionaryDictionaryEntryUseCase {
  constructor(
    private readonly dictionaryEntryRepository: IDictionaryEntryRepository,
  ) {}

  async execute(
    id: string,
    newDictionaryId: string,
  ): Promise<Result<DictionaryEntry>> {
    const dictionaryEntry =
      await this.dictionaryEntryRepository.changeDictionary(
        id,
        newDictionaryId,
      );
    return Result.success(dictionaryEntry);
  }
}
