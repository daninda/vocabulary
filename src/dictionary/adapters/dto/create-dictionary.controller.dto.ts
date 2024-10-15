import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateDictionaryControllerOutput {
  id: string;
  name: string;
  createAt: string;
  updateAt: string;
}

export class CreateDictionaryControllerInput {
  @MaxLength(255)
  @IsNotEmpty()
  @IsString()
  name: string;
}
