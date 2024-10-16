import { Module } from '@nestjs/common';
import { CreateDictionaryUseCase } from 'src/usecases/dictionary/create.dictionary.usecase';
import { IDictionaryRepository } from 'src/domain/repositories/dictionary.repository.interface';
import { DictionaryController } from 'src/infrastructure/controllers/dictionary.controller';
import { DictionaryRepository } from '../repositories/dictionary.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DictionaryEntity } from '../data/postgres/entities/dictionary.entity';
import { FindAllDictionaryUseCase } from 'src/usecases/dictionary/find-all.dictionary.usecase';
import { FindByIdDictionaryUseCase } from 'src/usecases/dictionary/find-by-id.dictionary.usecase';

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
