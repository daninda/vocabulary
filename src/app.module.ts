import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DictionaryModule } from './infrastructure/modules/dictionary.module';
import { PostgresTypeOrmModule } from './infrastructure/data/postgres/postgres-typeorm.module';
import { AuthModule } from './infrastructure/modules/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    PostgresTypeOrmModule,
    AuthModule,
    DictionaryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
