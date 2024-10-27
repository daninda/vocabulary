import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class LoginUserInput {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  password: string;

  @IsString()
  @IsNotEmpty()
  fingerprint: string;
}

export class LoginUserOutput {
  accessToken: string;
  refreshToken: string;
}
