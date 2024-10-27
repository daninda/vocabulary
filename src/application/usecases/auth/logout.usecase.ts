import { ISessionRepository } from '@application/repositories/session.interface';
import { IJwtService } from '@application/services/jwt.interface';
import { Injectable } from '@nestjs/common';
import { Result } from '@shared/utils/result';

@Injectable()
export class LogoutUserUseCase {
  constructor(
    private readonly jwtService: IJwtService,
    private readonly sessionRepository: ISessionRepository,
  ) {}

  async execute(
    refreshToken: string,
    fingerprint: string,
  ): Promise<Result<null>> {
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

    await this.sessionRepository.deleteByUserIdAndFingerprint(
      payload.userId,
      payload.fingerprint,
    );
    return Result.success(null);
  }
}
