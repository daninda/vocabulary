import { DictionaryEntry } from '@domain/dictionary-entry';
import { IsNotEmpty, IsString } from 'class-validator';

export class FindByIdDictionaryEntryInput {
  @IsNotEmpty()
  @IsString()
  id: string;
}

export type FindByIdDictionaryEntryOutput = DictionaryEntry;
