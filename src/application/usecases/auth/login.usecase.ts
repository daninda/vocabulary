import { ISessionRepository } from '@application/repositories/session.interface';
import { IUserRepository } from '@application/repositories/user.interface';
import { IJwtService } from '@application/services/jwt.interface';
import { Session } from '@domain/session';
import { LoginUserInput, LoginUserOutput } from '@dtos/auth/login.dto';
import { Injectable } from '@nestjs/common';
import { Result } from '@shared/utils/result';

@Injectable()
export class LoginUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly sessionRepository: ISessionRepository,
    private readonly jwtService: IJwtService,
  ) {}

  async execute(dto: LoginUserInput): Promise<Result<LoginUserOutput>> {
    const existingUser = await this.userRepository.findByEmail(dto.email);
    if (!existingUser) {
      return Result.failure('Wrong email or password');
    }

    if (!existingUser.checkPassword(dto.password)) {
      return Result.failure('Wrong email or password');
    }

    const user = existingUser;

    const accessToken = this.jwtService.signAccessToken({
      userId: user.id,
      fingerprint: dto.fingerprint,
    });
    const refreshToken = this.jwtService.signRefreshToken({
      userId: user.id,
      fingerprint: dto.fingerprint,
    });

    const session = Session.create(user.id, dto.fingerprint, refreshToken);

    await this.sessionRepository.deleteByUserIdAndFingerprint(
      session.userId,
      session.fingerprint,
    );

    await this.sessionRepository.save(session);

    return Result.success({ accessToken, refreshToken });
  }
}
