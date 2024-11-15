import { IYaDictionaryService } from '@application/services/ya-dictionary.interface';
import { DictionaryEntry } from '@domain/dictionary-entry';
import { Injectable } from '@nestjs/common';
import { getPartOfSpeech } from '@shared/types/parts-of-speech';
import { Result } from '@shared/utils/result';

@Injectable()
export class LookupDictionaryEntryUsecase {
  constructor(private readonly yaDictionaryService: IYaDictionaryService) {}

  async execute(text: string): Promise<Result<DictionaryEntry[]>> {
    const yaResponse = await this.yaDictionaryService.lookup(text);

    if (!yaResponse) {
      return Result.failure(`Cannot lookup word`);
    }

    const dictionaryEntries = yaResponse.def.map((d) => {
      const withExample = d.tr[0].ex != undefined;

      const dictionaryEntry = new DictionaryEntry(
        undefined,
        undefined,
        d.text,
        getPartOfSpeech(d.pos),
        {
          word: d.tr[0].text,
          pos: d.tr[0].pos,
          synonims: d.tr[0].syn?.map((s) => s.text),
          means: d.tr[0].mean?.map((m) => m.text),
          example: !withExample
            ? undefined
            : {
                text: d.tr[0].ex[0].text,
                translated: d.tr[0].ex[0].tr[0].text,
              },
        },
        undefined,
        undefined,
        undefined,
      );

      return dictionaryEntry;
    });

    return Result.success(dictionaryEntries);
  }
}
