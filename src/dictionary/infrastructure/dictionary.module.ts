import { Module } from '@nestjs/common';
import { CreateDictionaryUseCase } from 'src/dictionary/usecases/create.dictionary.usecase';
import { IDictionaryRepository } from 'src/common/interfaces/repositories/dictionary.repository.interface';
import { DictionaryController } from 'src/dictionary/adapters/controllers/dictionary.controller';
import { DictionaryRepository } from './dictionary.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DictionaryEntity } from './dictionary.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DictionaryEntity])],
  controllers: [DictionaryController],
  providers: [
    CreateDictionaryUseCase,
    { provide: IDictionaryRepository, useClass: DictionaryRepository },
  ],
})
export class DictionaryModule {}
