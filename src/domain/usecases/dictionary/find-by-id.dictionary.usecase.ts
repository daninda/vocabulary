import { Injectable } from '@nestjs/common';
import { IDictionary } from '../../entities/dictionary.interface';
import { IDictionaryRepository } from '../../repositories/dictionary.repository.interface';

@Injectable()
export class FindByIdDictionaryUseCase {
  constructor(private readonly dictionaryRepository: IDictionaryRepository) {}

  async execute(id: string): Promise<IDictionary | null> {
    return this.dictionaryRepository.findById(id);
  }
}
