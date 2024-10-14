import { Injectable } from '@nestjs/common';
import { IDictionary } from '../../entities/dictionary.interface';
import { IDictionaryRepository } from '../../repositories/dictionary.repository.interface';

@Injectable()
export class UpdateDictionaryUseCase {
  constructor(private readonly dictionaryRepository: IDictionaryRepository) {}

  async execute(dictionary: IDictionary): Promise<IDictionary> {
    return await this.dictionaryRepository.update(dictionary);
  }
}
