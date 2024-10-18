import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IJwtService } from 'src/application/services/jwt-service.interface';
import * as jsonwebtoken from 'jsonwebtoken';
import {
  IJwtAccessPayload,
  IJwtRefreshPayload,
} from 'src/shared/types/jwt-payload.type';

@Injectable()
export class JwtService implements IJwtService {
  constructor(private readonly configService: ConfigService) {}

  signAccessToken(payload: IJwtAccessPayload): string {
    return jsonwebtoken.sign(
      payload,
      this.configService.get<string>('JWT_ACCESS_SECRET'),
      { expiresIn: this.configService.get<string>('JWT_ACCESS_EXPIRE') },
    );
  }
  signRefreshToken(payload: IJwtRefreshPayload): string {
    return jsonwebtoken.sign(
      payload,
      this.configService.get<string>('JWT_REFRESH_SECRET'),
      { expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRE') },
    );
  }
  verifyAccessToken(token: string): IJwtAccessPayload {
    return <IJwtAccessPayload>(
      jsonwebtoken.verify(
        token,
        this.configService.get<string>('JWT_ACCESS_SECRET'),
      )
    );
  }
  verifyRefreshToken(token: string): IJwtRefreshPayload {
    return <IJwtRefreshPayload>(
      jsonwebtoken.verify(
        token,
        this.configService.get<string>('JWT_REFRESH_SECRET'),
      )
    );
  }
}
