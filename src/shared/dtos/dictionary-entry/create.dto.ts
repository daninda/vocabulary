import { DictionaryEntry } from '@domain/dictionary-entry';
import { PartOfSpeech } from '@shared/types/parts-of-speech';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDictionaryEntryInput {
  @IsNotEmpty()
  @IsString()
  dictionaryId: string;

  @IsNotEmpty()
  @IsString()
  word: string;

  @IsNotEmpty()
  @IsString()
  partOfSpeech: PartOfSpeech;
}

export type CreateDictionaryEntryOutput = DictionaryEntry;
