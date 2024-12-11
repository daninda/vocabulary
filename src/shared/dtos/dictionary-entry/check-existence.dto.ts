import { PartOfSpeech } from '@shared/types/parts-of-speech';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

class CheckWord {
  @IsNotEmpty()
  @IsString()
  word: string;

  @IsNotEmpty()
  @IsString()
  pos: PartOfSpeech;
}

interface ExistenceWord {
  checkWord: CheckWord;
  exist: boolean;
}

export interface CheckExistingDictionaryEntryOutput {
  existenceWords: ExistenceWord[];
}

export class CheckExistingDictionaryEntryInput {
  @IsNotEmpty()
  @IsString()
  dictionaryId: string;

  @IsArray()
  checkWords: CheckWord[];
}
