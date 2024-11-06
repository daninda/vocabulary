import { DictionaryEntry } from '@domain/dictionary-entry';
import { IsNotEmpty, IsString } from 'class-validator';

export class RatingDictionaryEntryInput {
  @IsNotEmpty()
  @IsString()
  id: string;
}

export type RatingDictionaryEntryOutput = DictionaryEntry;
