export abstract class IJwtService {
  abstract signAccessToken(payload: any): string;
  abstract signRefreshToken(payload: any): string;
  abstract verifyAccessToken(token: string): any;
  abstract verifyRefreshToken(token: string): any;
}
