import { Injectable } from '@nestjs/common';
import { Dictionary } from 'src/dictionary/entities/dictionary';
import { IDictionaryRepository } from 'src/common/interfaces/repositories/dictionary.repository.interface';

@Injectable()
export class FindAllDictionaryUseCase {
  constructor(private readonly dictionaryRepository: IDictionaryRepository) {}

  async execute(): Promise<Dictionary[]> {
    return this.dictionaryRepository.findAll();
  }
}
