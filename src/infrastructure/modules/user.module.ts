import { Module } from '@nestjs/common';
import { UserEntity } from '../data/postgres/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth.module';
import { UserController } from '../controllers/user.controller';
import { GetUserInfoUseCase } from 'src/application/usecases/user/get-user-info.usecase';
import { IUserRepository } from 'src/application/repositories/user-repository.interface';
import { UserRepository } from '../data/postgres/repositories/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), AuthModule],
  controllers: [UserController],
  providers: [
    GetUserInfoUseCase,
    { provide: IUserRepository, useClass: UserRepository },
  ],
})
export class UserModule {}
