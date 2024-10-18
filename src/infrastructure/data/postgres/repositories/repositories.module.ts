import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresTypeOrmModule } from '../postgres-typeorm.module';
import { DictionaryEntity } from '../entities/dictionary.entity';
import { DictionaryRepository } from 'src/infrastructure/data/postgres/repositories/dictionary.repository';
import { UserEntity } from '../entities/user.entity';
import { SessionEntity } from '../entities/session.entity';
import { UserRepository } from './user.repository';
import { SessionRepository } from './session.repository';

@Module({
  imports: [
    PostgresTypeOrmModule,
    TypeOrmModule.forFeature([DictionaryEntity, UserEntity, SessionEntity]),
  ],
  providers: [DictionaryRepository, UserRepository, SessionRepository],
  exports: [DictionaryRepository, UserRepository, SessionRepository],
})
export class RepositoriesModule {}
