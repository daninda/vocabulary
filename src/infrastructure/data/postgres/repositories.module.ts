import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresTypeOrmModule } from './postgres-typeorm.module';
import { DictionaryEntity } from './entities/dictionary.entity';
import { DictionaryRepository } from 'src/infrastructure/data/postgres/repositories/dictionary.repository';

@Module({
  imports: [
    PostgresTypeOrmModule,
    TypeOrmModule.forFeature([DictionaryEntity]),
  ],
  providers: [DictionaryRepository],
  exports: [DictionaryRepository],
})
export class RepositoriesModule {}
