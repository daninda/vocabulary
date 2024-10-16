import { Injectable } from '@nestjs/common';
import { Dictionary } from 'src/domain/entities/dictionary';
import { IDictionaryRepository } from 'src/domain/repositories/dictionary.repository.interface';
import { FindByIdDictionaryInput } from 'src/shared/dtos/dictionary/find-by-id-dictionary.dto';

@Injectable()
export class FindByIdDictionaryUseCase {
  constructor(private readonly dictionaryRepository: IDictionaryRepository) {}

  async execute(dto: FindByIdDictionaryInput): Promise<Dictionary | null> {
    return this.dictionaryRepository.findById(dto.id);
  }
}
