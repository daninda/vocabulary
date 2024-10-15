import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateDictionaryControllerOutput {
  id: string;
  name: string;
  createAt: string;
  updateAt: string;
}

export class CreateDictionaryControllerInput {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;
}
