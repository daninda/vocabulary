import { Injectable } from '@nestjs/common';
import { IDictionaryRepository } from '../../repositories/dictionary.repository.interface';
import { IDictionary } from '../../entities/dictionary.interface';

@Injectable()
export class CreateDictionaryUseCase {
  constructor(private readonly dictionaryRepository: IDictionaryRepository) {}

  async execute(dictionary: IDictionary): Promise<IDictionary> {
    return this.dictionaryRepository.save(dictionary);
  }
}
