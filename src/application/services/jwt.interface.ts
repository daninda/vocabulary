import {
  IJwtAccessPayload,
  IJwtRefreshPayload,
} from '@shared/types/jwt-payload';

export abstract class IJwtService {
  abstract signAccessToken(payload: IJwtAccessPayload): string;
  abstract signRefreshToken(payload: IJwtRefreshPayload): string;
  abstract verifyAccessToken(token: string): IJwtAccessPayload;
  abstract verifyRefreshToken(token: string): IJwtRefreshPayload;
}
