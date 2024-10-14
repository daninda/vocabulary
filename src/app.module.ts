import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PostgresTypeOrmModule } from './infrastructure/postgres-typeorm/postgres-typeorm.module';
import { DictionaryModule } from './infrastructure/modules/dictionary.module';

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
