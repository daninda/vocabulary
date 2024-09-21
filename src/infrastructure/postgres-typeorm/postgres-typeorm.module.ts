import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

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
    synchronize: config.get<boolean>('POSTGRES_SYNC'),
    entities: [process.cwd() + './../../**/*.entity{.ts,.js}'],
    migrationsRun: true,
    migrations: [process.cwd() + '/migrations/**/*{.ts,.js}'],
    cli: {
      migrationsDir: 'src/migrations',
    },
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
