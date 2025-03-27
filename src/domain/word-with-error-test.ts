import { IDictionaryEntry } from 'ui/src/utils/types';

export class WordWithErrorTest {
  constructor(
    public dictionaryEntry: IDictionaryEntry,
    public wordWithError: string,
  ) {}

  static create(
    dictionaryEntry: IDictionaryEntry,
    wordWithError: string,
  ): WordWithErrorTest {
    return new WordWithErrorTest(dictionaryEntry, wordWithError);
  }
}
