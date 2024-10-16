import { ISessionRepository } from 'src/application/repositories/session-repository.interface';
import { IJwtService } from 'src/application/services/jwt-service.interface';

export class RefreshUseCase {
  constructor(
    private readonly jwtService: IJwtService,
    private readonly sessionRepository: ISessionRepository,
  ) {}

  async execute(
    refreshToken: string,
    fingerprint: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const payload = this.jwtService.verifyRefreshToken(refreshToken);

    if (payload.fingerprint !== fingerprint) {
      throw new Error('Invalid fingerprint');
    }

    const session = await this.sessionRepository.findByUserIdAndFingerprint(
      payload.id,
      payload.fingerprint,
    );

    if (!session) {
      throw new Error('Session not found');
    }

    const newAccessToken = this.jwtService.signAccessToken({
      id: session.userId,
      fingerprint: session.fingerprint,
    });
    const newRefreshToken = this.jwtService.signRefreshToken({
      id: session.userId,
      fingerprint: session.fingerprint,
    });

    session.refreshToken = newRefreshToken;

    await this.sessionRepository.save(session);

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  }
}
