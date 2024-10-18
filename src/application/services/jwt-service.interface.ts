import {
  IJwtAccessPayload,
  IJwtRefreshPayload,
} from 'src/shared/types/jwt-payload.type';

export abstract class IJwtService {
  abstract signAccessToken(payload: IJwtAccessPayload): string;
  abstract signRefreshToken(payload: IJwtRefreshPayload): string;
  abstract verifyAccessToken(token: string): IJwtAccessPayload;
  abstract verifyRefreshToken(token: string): IJwtRefreshPayload;
}
