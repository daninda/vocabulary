import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PostgresTypeOrmModule } from './common/postgres-typeorm/postgres-typeorm.module';
import { DictionaryModule } from './dictionary/infrastructure/dictionary.module';

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
