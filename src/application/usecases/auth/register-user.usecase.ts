import { Injectable } from '@nestjs/common';
import { ISessionRepository } from 'src/application/repositories/session-repository.interface';
import { IUserRepository } from 'src/application/repositories/user-repository.interface';
import { IJwtService } from 'src/application/services/jwt-service.interface';
import { Session } from 'src/domain/entities/session';
import { User } from 'src/domain/entities/user';
import { RegisterUserInput } from 'src/shared/dtos/user/register-user.dto';

@Injectable()
export class RegisterUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly sessionRepository: ISessionRepository,
    private readonly jwtService: IJwtService,
  ) {}

  async execute(
    dto: RegisterUserInput,
  ): Promise<{ user: User; accessToken: string; refreshToken: string }> {
    const existingUser = await this.userRepository.findByEmail(dto.email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    const user = User.create(dto.name, dto.email, dto.password);

    const accessToken = this.jwtService.signAccessToken({
      id: user.id,
      fingerprint: dto.fingerprint,
    });
    const refreshToken = this.jwtService.signRefreshToken({
      id: user.id,
      fingerprint: dto.fingerprint,
    });

    const session = Session.create(user.id, dto.fingerprint, refreshToken);

    await this.sessionRepository.save(session);

    await this.userRepository.save(user);

    return { user, accessToken, refreshToken };
  }
}
