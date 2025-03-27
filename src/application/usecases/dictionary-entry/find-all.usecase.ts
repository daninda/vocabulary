import { IDictionaryEntryRepository } from '@application/repositories/dictionary-entry.interface';
import { DictionaryEntry } from '@domain/dictionary-entry';
import { Injectable } from '@nestjs/common';
import { Result } from '@shared/utils/result';

@Injectable()
export class FindAllDictionaryEntryUseCase {
  constructor(
    private readonly dictionaryEntryRepository: IDictionaryEntryRepository,
  ) {}

  async execute(
    dictionaryId: string,
    sort: string,
    search?: string,
  ): Promise<Result<DictionaryEntry[]>> {
    const dictionaryEntries = await this.dictionaryEntryRepository.findAll(
      dictionaryId,
      sort,
      search,
    );
    return Result.success(dictionaryEntries);
  }
}
