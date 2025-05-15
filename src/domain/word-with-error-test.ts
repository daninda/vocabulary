import { DictionaryEntry } from './dictionary-entry';

export class WordWithErrorTest {
  constructor(
    public dictionaryEntry: DictionaryEntry,
    public wordWithError: string,
  ) {}

  static create(
    dictionaryEntry: DictionaryEntry,
    wordWithError: string,
  ): WordWithErrorTest {
    return new WordWithErrorTest(dictionaryEntry, wordWithError);
  }
}
