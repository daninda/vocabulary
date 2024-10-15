import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DictionaryEntity } from '../../dictionary/infrastructure/dictionary.entity';
import { PostgresTypeOrmModule } from './postgres-typeorm.module';
import { DictionaryRepository } from '../../dictionary/infrastructure/dictionary.repository';

@Module({
  imports: [
    PostgresTypeOrmModule,
    TypeOrmModule.forFeature([DictionaryEntity]),
  ],
  providers: [DictionaryRepository],
  exports: [DictionaryRepository],
})
export class RepositoriesModule {}
