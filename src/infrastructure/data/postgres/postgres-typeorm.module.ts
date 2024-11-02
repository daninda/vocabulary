import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { DictionaryEntity } from './entities/dictionary';
import { DictionaryEntryEntity } from './entities/dictionary-entry';
import { SessionEntity } from './entities/session';
import { UserEntity } from './entities/user';

export const typeormModuleFactory = (
  config: ConfigService,
): TypeOrmModuleOptions => {
  return {
    type: 'postgres',
    host: config.get<string>('POSTGRES_HOST'),
    port: config.get<number>('POSTGRES_PORT'),
    username: config.get<string>('POSTGRES_USER'),
    password: config.get<string>('POSTGRES_PASSWORD'),
    database: config.get<string>('POSTGRES_DB'),
    schema: config.get<string>('POSTGRES_SCHEMA'),
    synchronize: Boolean(config.get<boolean>('POSTGRES_SYNC')),
    logging: Boolean(config.get<boolean>('POSTGRES_LOGGING')),
    entities: [
      DictionaryEntity,
      UserEntity,
      SessionEntity,
      DictionaryEntryEntity,
    ],
  } as TypeOrmModuleOptions;
};

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: typeormModuleFactory,
    }),
  ],
})
export class PostgresTypeOrmModule {}
