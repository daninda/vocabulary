import { IUserRepository } from 'src/application/repositories/user-repository.interface';
import { AuthController } from '../controllers/auth.controller';
import { UserEntity } from '../data/postgres/entities/user.entity';
import { UserRepository } from '../data/postgres/repositories/user.repository';
import { ISessionRepository } from 'src/application/repositories/session-repository.interface';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionEntity } from '../data/postgres/entities/session.entity';
import { SessionRepository } from '../data/postgres/repositories/session.repository';
import { Module } from '@nestjs/common';
import { RegisterUserUseCase } from 'src/application/usecases/auth/register-user.usecase';
import { LoginUserUseCase } from 'src/application/usecases/auth/login-user.usecase';
import { RefreshUseCase } from 'src/application/usecases/auth/refresh.usecase';
import { JwtService } from '../services/jwt.service';
import { ConfigModule } from '@nestjs/config';
import { AuthGuard } from '../guards/auth.guard';
import { IJwtService } from 'src/application/services/jwt-service.interface';
import { LogoutUserUseCase } from 'src/application/usecases/auth/logout-user.usecase';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, SessionEntity]),
    ConfigModule,
  ],
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
