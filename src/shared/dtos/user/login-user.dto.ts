import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

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
  user: {
    id: string;
    name: string;
    email: string;
    createAt: string;
    updateAt: string;
  };
  accessToken: string;
  refreshToken: string;
}
