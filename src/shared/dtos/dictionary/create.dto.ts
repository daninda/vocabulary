import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateDictionaryInput {
  @MaxLength(255)
  @IsNotEmpty()
  @IsString()
  name: string;
}

export class CreateDictionaryOutput {
  id: string;
  name: string;
  createAt: Date;
  updateAt: Date;
}
