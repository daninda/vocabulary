import { IDictionaryEntryRepository } from '@application/repositories/dictionary-entry.interface';
import { IYaDictionaryService } from '@application/services/ya-dictionary.interface';
import { DictionaryEntry } from '@domain/dictionary-entry';
import { Injectable } from '@nestjs/common';
import { getPartOfSpeech, PartOfSpeech } from '@shared/types/parts-of-speech';
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
    partOfSpeech: PartOfSpeech,
  ): Promise<Result<DictionaryEntry>> {
    const res = await this.yaDictionaryService.lookupOne(word, partOfSpeech);
    if (!res) {
      return Result.failure(`Cannot lookup word`);
    }

    const withExample = res.tr[0].ex != undefined;

    const newDictionaryEntry = DictionaryEntry.create(
      dictionaryId,
      res.text,
      getPartOfSpeech(res.pos),
      {
        word: res.tr[0].text,
        pos: res.tr[0].pos,
        synonims: res.tr[0].syn?.map((s) => s.text),
        means: res.tr[0].mean?.map((m) => m.text),
        example: !withExample
          ? undefined
          : {
              text: res.tr[0].ex[0].text,
              translated: res.tr[0].ex[0].tr[0].text,
            },
      },
    );

    const dictionaryEntry =
      await this.dictionaryEntryRepository.save(newDictionaryEntry);
    return Result.success(dictionaryEntry);
  }
}
