import { IsNotEmpty } from 'class-validator';

export class CreateDictionaryControllerOutput {
  id: string;
  name: string;
  createAt: string;
  updateAt: string;
}

export class CreateDictionaryControllerInput {
  @IsNotEmpty()
  name: string;
}
