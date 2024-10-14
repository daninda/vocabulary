import { Injectable } from '@nestjs/common';
import { IDictionaryRepository } from '../../repositories/dictionary.repository.interface';
import { IDictionary } from '../../entities/dictionary.interface';

@Injectable()
export class FindAllDictionaryUseCase {
  constructor(private readonly dictionaryRepository: IDictionaryRepository) {}

  async execute(): Promise<IDictionary[]> {
    return this.dictionaryRepository.findAll();
  }
}
