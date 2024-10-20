import { Injectable } from '@nestjs/common';
import { ISessionRepository } from 'src/application/repositories/session-repository.interface';
import { IUserRepository } from 'src/application/repositories/user-repository.interface';
import { IJwtService } from 'src/application/services/jwt-service.interface';
import { Session } from 'src/domain/entities/session';
import {
  LoginUserInput,
  LoginUserOutput,
} from 'src/shared/dtos/auth/login-user.dto';
import { Result } from 'src/shared/utils/result';

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
