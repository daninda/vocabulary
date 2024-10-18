import { Injectable } from '@nestjs/common';
import { ISessionRepository } from 'src/application/repositories/session-repository.interface';
import { IUserRepository } from 'src/application/repositories/user-repository.interface';
import { IJwtService } from 'src/application/services/jwt-service.interface';
import { Session } from 'src/domain/entities/session';
import { User } from 'src/domain/entities/user';
import {
  RegisterUserInput,
  RegisterUserOutput,
} from 'src/shared/dtos/user/register-user.dto';
import { Result } from 'src/shared/utils/result';

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
