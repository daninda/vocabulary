import { DictionaryEntry } from '@domain/dictionary-entry';
import { IsNotEmpty, IsString } from 'class-validator';

export class ChangeDictionaryDictionaryEntryInput {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  dictionaryId: string;
}

export type ChangeDictionaryDictionaryEntryOutput = DictionaryEntry;
