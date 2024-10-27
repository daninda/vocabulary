import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DictionaryEntity } from './entities/dictionary';
import { SessionEntity } from './entities/session';
import { UserEntity } from './entities/user';
import { PostgresTypeOrmModule } from './postgres-typeorm.module';
import { DictionaryRepository } from './repositories/dictionary';
import { SessionRepository } from './repositories/session';
import { UserRepository } from './repositories/user';

@Module({
  imports: [
    PostgresTypeOrmModule,
    TypeOrmModule.forFeature([DictionaryEntity, UserEntity, SessionEntity]),
  ],
  providers: [DictionaryRepository, UserRepository, SessionRepository],
  exports: [
    DictionaryRepository,
    UserRepository,
    SessionRepository,
    TypeOrmModule.forFeature([DictionaryEntity, UserEntity, SessionEntity]),
  ],
})
export class RepositoriesModule {}
