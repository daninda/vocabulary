import { ISessionRepository } from '@application/repositories/session.interface';
import { IJwtService } from '@application/services/jwt.interface';
import { Injectable } from '@nestjs/common';
import { Result } from '@shared/utils/result';

@Injectable()
export class RefreshUseCase {
  constructor(
    private readonly jwtService: IJwtService,
    private readonly sessionRepository: ISessionRepository,
  ) {}

  async execute(
    refreshToken: string,
    fingerprint: string,
  ): Promise<Result<{ accessToken: string; refreshToken: string }>> {
    const payload = this.jwtService.verifyRefreshToken(refreshToken);

    if (payload.fingerprint !== fingerprint) {
      return Result.failure('Invalid fingerprint');
    }

    const session = await this.sessionRepository.findByUserIdAndFingerprint(
      payload.userId,
      payload.fingerprint,
    );

    if (!session) {
      return Result.failure('Invalid session');
    }

    const newAccessToken = this.jwtService.signAccessToken({
      userId: session.userId,
      fingerprint: session.fingerprint,
    });
    const newRefreshToken = this.jwtService.signRefreshToken({
      userId: session.userId,
      fingerprint: session.fingerprint,
    });

    session.refreshToken = newRefreshToken;

    await this.sessionRepository.save(session);

    return Result.success({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  }
}
