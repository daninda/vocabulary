import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DictionaryEntity } from '../entities/dictionary.entity';
import { PostgresTypeOrmModule } from './postgres-typeorm.module';
import { DictionaryRepository } from './dictionary.repository';

@Module({
  imports: [
    PostgresTypeOrmModule,
    TypeOrmModule.forFeature([DictionaryEntity]),
  ],
  providers: [DictionaryRepository],
  exports: [DictionaryRepository],
})
export class RepositorysModule {}
