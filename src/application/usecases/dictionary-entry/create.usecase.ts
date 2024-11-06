import { IDictionaryEntryRepository } from '@application/repositories/dictionary-entry.interface';
import { IYaDictionaryService } from '@application/services/ya-dictionary.interface';
import { DictionaryEntry } from '@domain/dictionary-entry';
import { Injectable } from '@nestjs/common';
import { getPartOfSpeech } from '@shared/types/parts-of-speech';
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

    console.log(res.def[0].tr);

    const withExample = res.def[0].tr[0].ex != undefined;

    const newDictionaryEntry = DictionaryEntry.create(
      dictionaryId,
      res.def[0].text,
      getPartOfSpeech(res.def[0].pos),
      {
        word: res.def[0].tr[0].text,
        pos: res.def[0].tr[0].pos,
        synonims: res.def[0].tr[0].syn.map((s) => s.text),
        means: res.def[0].tr[0].mean.map((m) => m.text),
        example: !withExample
          ? undefined
          : {
              text: res.def[0].tr[0].ex[0].text,
              translated: res.def[0].tr[0].ex[0].tr[0].text,
            },
      },
    );

    const dictionaryEntry =
      await this.dictionaryEntryRepository.save(newDictionaryEntry);
    return Result.success(dictionaryEntry);
  }
}
