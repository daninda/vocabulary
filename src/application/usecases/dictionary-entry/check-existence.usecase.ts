import { IDictionaryEntryRepository } from '@application/repositories/dictionary-entry.interface';
import { Injectable } from '@nestjs/common';
import { getPartOfSpeech, PartOfSpeech } from '@shared/types/parts-of-speech';
import { Result } from '@shared/utils/result';

interface CheckWord {
  word: string;
  pos: PartOfSpeech;
}

interface Input {
  checkWords: CheckWord[];
  dictionaryId: string;
}

interface ExistenceWord {
  checkWord: CheckWord;
  exist: boolean;
}

interface Output {
  existenceWords: ExistenceWord[];
}

@Injectable()
export class CheckExistingDictionaryEntryUseCase {
  constructor(
    private readonly dictionaryEntryRepository: IDictionaryEntryRepository,
  ) {}

  async execute(data: Input): Promise<Result<Output>> {
    const { checkWords, dictionaryId } = data;

    const dictionaryEntries =
      await this.dictionaryEntryRepository.findAll(dictionaryId);

    const existenceWords: ExistenceWord[] = checkWords.map((checkWord) => {
      const dictionaryEntry = dictionaryEntries.find(
        (dictionaryEntry) =>
          dictionaryEntry.word === checkWord.word &&
          dictionaryEntry.pos === getPartOfSpeech(checkWord.pos),
      );

      return {
        checkWord,
        exist: !!dictionaryEntry,
      };
    });

    const output: Output = {
      existenceWords,
    };
    return Result.success(output);
  }
}
