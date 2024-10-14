import { Injectable } from '@nestjs/common';
import { Dictionary } from 'src/domain/entities/dictionary';
import { IDictionaryRepository } from 'src/domain/repositories/dictionary.repository.interface';

@Injectable()
export class FindByIdDictionaryUseCase {
  constructor(private readonly dictionaryRepository: IDictionaryRepository) {}

  async execute(id: string): Promise<Dictionary | null> {
    return this.dictionaryRepository.findById(id);
  }
}
