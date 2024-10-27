import { IUserRepository } from '@application/repositories/user.interface';
import { UserController } from '@infrastructure/controllers/user';
import { Module } from '@nestjs/common';
import { RepositoriesModule } from '@postgres/repositories.module';
import { UserRepository } from '@postgres/repositories/user';
import { GetUserInfoUseCase } from '@usecases/user/get-info.usecase';

import { AuthModule } from './auth';

@Module({
  imports: [RepositoriesModule, AuthModule],
  controllers: [UserController],
  providers: [
    GetUserInfoUseCase,
    { provide: IUserRepository, useClass: UserRepository },
  ],
})
export class UserModule {}
