import { Injectable } from '@nestjs/common';
import { Dictionary } from 'src/dictionary/entities/dictionary';
import { IDictionaryRepository } from 'src/common/interfaces/repositories/dictionary.repository.interface';

@Injectable()
export class FindByIdDictionaryUseCase {
  constructor(private readonly dictionaryRepository: IDictionaryRepository) {}

  async execute(id: string): Promise<Dictionary | null> {
    return this.dictionaryRepository.findById(id);
  }
}
