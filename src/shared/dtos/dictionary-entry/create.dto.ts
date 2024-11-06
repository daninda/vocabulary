import { DictionaryEntry } from '@domain/dictionary-entry';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDictionaryEntryInput {
  @IsNotEmpty()
  @IsString()
  dictionaryId: string;

  @IsNotEmpty()
  @IsString()
  word: string;
}

export type CreateDictionaryEntryOutput = DictionaryEntry;
