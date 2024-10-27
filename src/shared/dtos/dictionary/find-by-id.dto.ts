import { IsNotEmpty, IsString } from 'class-validator';

export class FindByIdDictionaryInput {
  @IsNotEmpty()
  @IsString()
  id: string;
}

export class FindByIdDictionaryOutput {
  id: string;
  name: string;
  createAt: string;
  updateAt: string;
}
