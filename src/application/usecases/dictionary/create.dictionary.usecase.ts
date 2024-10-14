import { Injectable } from '@nestjs/common';
import { Dictionary } from 'src/domain/entities/dictionary';
import { IDictionaryRepository } from 'src/domain/repositories/dictionary.repository.interface';

@Injectable()
export class CreateDictionaryUseCase {
  constructor(private readonly dictionaryRepository: IDictionaryRepository) {}

  async execute(dictionary: Dictionary): Promise<Dictionary> {
    return this.dictionaryRepository.save(dictionary);
  }
}
