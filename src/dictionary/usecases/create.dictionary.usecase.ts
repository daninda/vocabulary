import { Injectable } from '@nestjs/common';
import { Dictionary } from 'src/dictionary/entities/dictionary';
import { IDictionaryRepository } from 'src/common/interfaces/repositories/dictionary.repository.interface';
import {
  CreateDictionaryUsecaseInput,
  CreateDictionaryUseCaseOutput,
} from './dto/create-dictionary.usecase.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CreateDictionaryUseCase {
  constructor(private readonly dictionaryRepository: IDictionaryRepository) {}

  async execute(
    dto: CreateDictionaryUsecaseInput,
  ): Promise<CreateDictionaryUseCaseOutput> {
    const dictionary = new Dictionary(
      uuidv4(),
      dto.name,
      new Date().toUTCString(),
      new Date().toUTCString(),
    );
    return this.dictionaryRepository.save(dictionary);
  }
}
