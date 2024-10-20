import { IsNotEmpty, IsString } from 'class-validator';

export class LogoutInput {
  @IsNotEmpty()
  @IsString()
  fingerprint: string;
}
