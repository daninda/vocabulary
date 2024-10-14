import { Module } from '@nestjs/common';
import { CreateDictionaryUseCase } from 'src/application/usecases/dictionary/create.dictionary.usecase';
import { IDictionaryRepository } from 'src/domain/repositories/dictionary.repository.interface';
import { DictionaryController } from 'src/presentation/controllers/dictionary.controller';
import { DictionaryRepository } from '../postgres-typeorm/dictionary.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DictionaryEntity } from '../entities/dictionary.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DictionaryEntity])],
  controllers: [DictionaryController],
  providers: [
    CreateDictionaryUseCase,
    { provide: IDictionaryRepository, useClass: DictionaryRepository },
  ],
})
export class DictionaryModule {}
