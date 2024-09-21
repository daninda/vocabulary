import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PostgresTypeOrmModule } from './infrastructure/postgres-typeorm/postgres-typeorm.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    PostgresTypeOrmModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
