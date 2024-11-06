import { DictionaryEntry } from './dictionary-entry';

export class Test {
  constructor(
    public dictionaryEntry: DictionaryEntry,
    public wrongs: string[],
  ) {}

  static create(dictionaryEntry: DictionaryEntry, wrongs: string[]): Test {
    return new Test(dictionaryEntry, wrongs);
  }
}
