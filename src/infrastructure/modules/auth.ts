import { ISessionRepository } from '@application/repositories/session.interface';
import { IUserRepository } from '@application/repositories/user.interface';
import { IJwtService } from '@application/services/jwt.interface';
import { AuthController } from '@infrastructure/controllers/auth';
import { AuthGuard } from '@infrastructure/guards/auth';
import { JwtService } from '@infrastructure/services/jwt';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RepositoriesModule } from '@postgres/repositories.module';
import { SessionRepository } from '@postgres/repositories/session';
import { UserRepository } from '@postgres/repositories/user';
import { LoginUserUseCase } from '@usecases/auth/login.usecase';
import { LogoutUserUseCase } from '@usecases/auth/logout.usecase';
import { RefreshUseCase } from '@usecases/auth/refresh.usecase';
import { RegisterUserUseCase } from '@usecases/auth/register.usecase';

@Module({
  imports: [RepositoriesModule, ConfigModule],
  controllers: [AuthController],
  providers: [
    { provide: IJwtService, useClass: JwtService },
    { provide: IUserRepository, useClass: UserRepository },
    { provide: ISessionRepository, useClass: SessionRepository },
    AuthGuard,
    RegisterUserUseCase,
    LoginUserUseCase,
    RefreshUseCase,
    LogoutUserUseCase,
  ],
  exports: [AuthGuard, IJwtService],
})
export class AuthModule {}
