import * as jwt from 'jsonwebtoken';

export interface IJwtAccessPayload extends jwt.JwtPayload {
  userId: string;
  fingerprint: string;
}

export interface IJwtRefreshPayload extends jwt.JwtPayload {
  userId: string;
  fingerprint: string;
}
