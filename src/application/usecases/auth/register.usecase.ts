import { ISessionRepository } from '@application/repositories/session.interface';
import { IUserRepository } from '@application/repositories/user.interface';
import { IJwtService } from '@application/services/jwt.interface';
import { Session } from '@domain/session';
import { User } from '@domain/user';
import { RegisterUserInput, RegisterUserOutput } from '@dtos/auth/register.dto';
import { Injectable } from '@nestjs/common';
import { Result } from '@shared/utils/result';

@Injectable()
export class RegisterUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly sessionRepository: ISessionRepository,
    private readonly jwtService: IJwtService,
  ) {}

  async execute(dto: RegisterUserInput): Promise<Result<RegisterUserOutput>> {
    const existingUser = await this.userRepository.findByEmail(dto.email);
    if (existingUser) {
      return Result.failure('User with this email already exists');
    }

    const user = User.create(dto.name, dto.email, dto.password);

    const accessToken = this.jwtService.signAccessToken({
      userId: user.id,
      fingerprint: dto.fingerprint,
    });
    const refreshToken = this.jwtService.signRefreshToken({
      userId: user.id,
      fingerprint: dto.fingerprint,
    });

    const session = Session.create(user.id, dto.fingerprint, refreshToken);

    await this.userRepository.save(user);

    await this.sessionRepository.save(session);

    return Result.success({ accessToken, refreshToken });
  }
}
