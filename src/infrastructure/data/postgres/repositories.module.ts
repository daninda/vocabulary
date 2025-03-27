import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DictionaryEntity } from './entities/dictionary';
import { DictionaryEntryEntity } from './entities/dictionary-entry';
import { SessionEntity } from './entities/session';
import { TestStatisticEntity } from './entities/test-statistic';
import { UserEntity } from './entities/user';
import { PostgresTypeOrmModule } from './postgres-typeorm.module';
import { DictionaryRepository } from './repositories/dictionary';
import { DictionaryEntryRepository } from './repositories/dictionary-entry';
import { SessionRepository } from './repositories/session';
import { UserRepository } from './repositories/user';

@Module({
  imports: [
    PostgresTypeOrmModule,
    TypeOrmModule.forFeature([
      DictionaryEntity,
      UserEntity,
      SessionEntity,
      DictionaryEntryEntity,
      TestStatisticEntity,
    ]),
  ],
  providers: [
    DictionaryRepository,
    UserRepository,
    SessionRepository,
    DictionaryEntryRepository,
  ],
  exports: [
    DictionaryRepository,
    UserRepository,
    SessionRepository,
    TypeOrmModule.forFeature([
      DictionaryEntity,
      UserEntity,
      SessionEntity,
      DictionaryEntryEntity,
      TestStatisticEntity,
    ]),
  ],
})
export class RepositoriesModule {}
