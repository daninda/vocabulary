import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DictionaryModule } from './infrastructure/modules/dictionary.module';
import { PostgresTypeOrmModule } from './infrastructure/data/postgres/postgres-typeorm.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    PostgresTypeOrmModule,
    DictionaryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
