import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IJwtService } from 'src/application/services/jwt-service.interface';
import jsonwebtoken from 'jsonwebtoken';

@Injectable()
export abstract class JwtService implements IJwtService {
  constructor(private readonly configService: ConfigService) {}

  signAccessToken(payload: any): string {
    return jsonwebtoken.sign(
      payload,
      this.configService.get<string>('JWT_ACCESS_SECRET'),
      { expiresIn: this.configService.get<string>('JWT_ACCESS_EXPIRE') },
    );
  }
  signRefreshToken(payload: any): string {
    return jsonwebtoken.sign(
      payload,
      this.configService.get<string>('JWT_REFRESH_SECRET'),
      { expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRE') },
    );
  }
  verifyAccessToken(token: string): any {
    return jsonwebtoken.verify(
      token,
      this.configService.get<string>('JWT_ACCESS_SECRET'),
    );
  }
  verifyRefreshToken(token: string): any {
    return jsonwebtoken.verify(
      token,
      this.configService.get<string>('JWT_REFRESH_SECRET'),
    );
  }
}
