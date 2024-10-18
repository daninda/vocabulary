import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class RegisterUserInput {
  @MaxLength(255)
  @IsNotEmpty()
  @IsString()
  name: string;

  @MaxLength(255)
  @IsNotEmpty()
  @IsString()
  email: string;

  @MaxLength(255)
  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  fingerprint: string;
}

export class RegisterUserOutput {
  accessToken: string;
  refreshToken: string;
}
