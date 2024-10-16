import { Injectable } from '@nestjs/common';
import { ISessionRepository } from 'src/application/repositories/session-repository.interface';
import { IUserRepository } from 'src/application/repositories/user-repository.interface';
import { IJwtService } from 'src/application/services/jwt-service.interface';
import { Session } from 'src/domain/entities/session';
import { User } from 'src/domain/entities/user';
import { LoginUserInput } from 'src/shared/dtos/user/login-user.dto';

@Injectable()
export class LoginUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly sessionRepository: ISessionRepository,
    private readonly jwtService: IJwtService,
  ) {}

  async execute(
    dto: LoginUserInput,
  ): Promise<{ user: User; accessToken: string; refreshToken: string }> {
    const existingUser = await this.userRepository.findByEmail(dto.email);
    if (!existingUser) {
      throw new Error('Wrong email or password');
    }

    if (!existingUser.checkPassword(dto.password)) {
      throw new Error('Wrong email or password');
    }

    const user = existingUser;

    const accessToken = this.jwtService.signAccessToken({
      id: user.id,
      fingerprint: dto.fingerprint,
    });
    const refreshToken = this.jwtService.signRefreshToken({
      id: user.id,
      fingerprint: dto.fingerprint,
    });

    const session = Session.create(user.id, dto.fingerprint, refreshToken);

    await this.sessionRepository.deleteByUserIdAndFingerprint(
      session.userId,
      session.fingerprint,
    );

    await this.sessionRepository.save(session);

    return { user, accessToken, refreshToken };
  }
}
