import { Test } from '@domain/test';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class GenerateTestInput {
  @IsNotEmpty()
  @IsString()
  dictionaryId: string;

  @IsNotEmpty()
  @IsNumber()
  wrongsCount: number;
}

export type GenerateTestOutput = Test;
