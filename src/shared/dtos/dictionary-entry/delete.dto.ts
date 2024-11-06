import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteDictionaryEntryInput {
  @IsNotEmpty()
  @IsString()
  id: string;
}
