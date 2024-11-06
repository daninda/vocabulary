import { DictionaryEntry } from '@domain/dictionary-entry';
import { IsNotEmpty, IsString } from 'class-validator';

export class FindAllDictionaryEntryInput {
  @IsNotEmpty()
  @IsString()
  dictionaryId: string;
}

export type FindAllDictionaryEntryOutput = DictionaryEntry[];
