import { Module } from '@nestjs/common';
import { CreateDictionaryUseCase } from 'src/application/usecases/dictionary/create.dictionary.usecase';
import { DictionaryController } from 'src/infrastructure/controllers/dictionary.controller';
import { DictionaryRepository } from '../data/postgres/repositories/dictionary.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DictionaryEntity } from '../data/postgres/entities/dictionary.entity';
import { FindAllDictionaryUseCase } from 'src/application/usecases/dictionary/find-all.dictionary.usecase';
import { FindByIdDictionaryUseCase } from 'src/application/usecases/dictionary/find-by-id.dictionary.usecase';
import { IDictionaryRepository } from 'src/application/repositories/dictionary-repository.interface';

@Module({
  imports: [TypeOrmModule.forFeature([DictionaryEntity])],
  controllers: [DictionaryController],
  providers: [
    CreateDictionaryUseCase,
    FindAllDictionaryUseCase,
    FindByIdDictionaryUseCase,
    { provide: IDictionaryRepository, useClass: DictionaryRepository },
  ],
})
export class DictionaryModule {}
