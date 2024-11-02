import { IDictionaryEntryRepository } from '@application/repositories/dictionary-entry.interface';
import { DictionaryEntry } from '@domain/dictionary-entry';
import { Injectable } from '@nestjs/common';
import { Result } from '@shared/utils/result';

@Injectable()
export class RatingDownDictionaryEntryUsecase {
  constructor(
    private readonly dictionaryEntryRepository: IDictionaryEntryRepository,
  ) {}

  async execute(id: string): Promise<Result<DictionaryEntry>> {
    const dictionaryEntry = await this.dictionaryEntryRepository.changeRating(
      id,
      -1,
    );
    return Result.success(dictionaryEntry);
  }
}
