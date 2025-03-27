import { WordWithErrorTest } from '@domain/word-with-error-test';
import { IsNotEmpty, IsString } from 'class-validator';

export class GenerateWordWithErrorTestInput {
  @IsNotEmpty()
  @IsString()
  dictionaryId: string;
}

export type GenerateWordWithErrorTestOutput = WordWithErrorTest;
