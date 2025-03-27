import { DictionaryEntry } from '@domain/dictionary-entry';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class FindAllDictionaryEntryInput {
  @IsNotEmpty()
  @IsString()
  dictionaryId: string;

  @IsString()
  search?: string;

  @IsEnum([
    'date_asc',
    'date_desc',
    'alphabet_asc',
    'alphabet_desc',
    'rating_asc',
    'rating_desc',
  ])
  sort: string = 'date_desc';
}

export type FindAllDictionaryEntryOutput = DictionaryEntry[];
