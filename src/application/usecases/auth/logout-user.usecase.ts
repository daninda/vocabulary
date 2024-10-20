import { Injectable } from '@nestjs/common';
import { ISessionRepository } from 'src/application/repositories/session-repository.interface';
import { IJwtService } from 'src/application/services/jwt-service.interface';
import { Result } from 'src/shared/utils/result';

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
