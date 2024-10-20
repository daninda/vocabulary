import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshInput {
  @IsNotEmpty()
  @IsString()
  fingerprint: string;
}

export class RefreshOutput {
  accessToken: string;
  refreshToken: string;
}
