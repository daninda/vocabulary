import { DictionaryEntry } from '@domain/dictionary-entry';
import { IsNotEmpty, IsString } from 'class-validator';

export class LookupDictionaryEntryInput {
  @IsNotEmpty()
  @IsString()
  word: string;
}

export type LookupDictionaryEntryOutput = DictionaryEntry[];
