import { DictionaryEntry } from '@domain/dictionary-entry';

export abstract class IDictionaryEntryRepository {
  abstract save(dictionaryEntry: DictionaryEntry): Promise<DictionaryEntry>;
  abstract findById(id: string): Promise<DictionaryEntry | null>;
  abstract findAll(
    dictionaryId: string,
    sort: string,
    search?: string,
  ): Promise<DictionaryEntry[]>;
  abstract deleteById(id: string): Promise<void>;
  abstract changeDictionary(
    id: string,
    dictionaryId: string,
  ): Promise<DictionaryEntry>;
  abstract changeRating(id: string, rating: number): Promise<DictionaryEntry>;
  abstract findForTestByDictionary(
    dictionaryId: string,
  ): Promise<DictionaryEntry | null>;
  abstract findForTest(userId: string): Promise<DictionaryEntry | null>;
}
