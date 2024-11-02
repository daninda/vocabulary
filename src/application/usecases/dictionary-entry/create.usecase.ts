import { IDictionaryEntryRepository } from '@application/repositories/dictionary-entry.interface';
import { IYaDictionaryService } from '@application/services/ya-dictionary.interface';
import { DictionaryEntry } from '@domain/dictionary-entry';
import { Injectable } from '@nestjs/common';
import { Result } from '@shared/utils/result';

@Injectable()
export class CreateDictionaryEntryUseCase {
  constructor(
    private readonly dictionaryEntryRepository: IDictionaryEntryRepository,
    private readonly yaDictionaryService: IYaDictionaryService,
  ) {}

  async execute(
    dictionaryId: string,
    word: string,
  ): Promise<Result<DictionaryEntry>> {
    const res = await this.yaDictionaryService.lookup(word);
    if (!res) {
      return Result.failure(`Cannot lookup word`);
    }

    const newDictionaryEntry = DictionaryEntry.create(
      dictionaryId,
      res.definitions[0].text,
      res.definitions[0].pos,
      {
        word: res.definitions[0].tr[0].text,
        pos: res.definitions[0].tr[0].pos,
        synonims: res.definitions[0].tr[0].syn.map((s) => s.text),
        means: res.definitions[0].tr[0].mean.map((m) => m.text),
        example: {
          text: res.definitions[0].tr[0].ex[0].text,
          translated: res.definitions[0].tr[0].ex[0].tr[0].text,
        },
      },
    );

    const dictionaryEntry =
      await this.dictionaryEntryRepository.save(newDictionaryEntry);
    return Result.success(dictionaryEntry);
  }
}
