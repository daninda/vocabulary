import { IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class TranslateInput {
  @IsNotEmpty()
  @IsString()
  text: string;

  @IsNotEmpty()
  @IsString()
  from: string;

  @IsNotEmpty()
  @IsString()
  to: string;

  @IsNotEmpty()
  @Min(0)
  @Max(10)
  alternatives: number;
}

export class TranslateOutput {
  translatedText: string;
}
