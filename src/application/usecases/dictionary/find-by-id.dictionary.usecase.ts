import { Injectable } from '@nestjs/common';
import { IDictionaryRepository } from 'src/application/repositories/dictionary-repository.interface';
import { Dictionary } from 'src/domain/entities/dictionary';
import { FindByIdDictionaryInput } from 'src/shared/dtos/dictionary/find-by-id-dictionary.dto';

@Injectable()
export class FindByIdDictionaryUseCase {
  constructor(private readonly dictionaryRepository: IDictionaryRepository) {}

  async execute(dto: FindByIdDictionaryInput): Promise<Dictionary | null> {
    return this.dictionaryRepository.findById(dto.id);
  }
}
