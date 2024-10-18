import { Injectable } from '@nestjs/common';
import { IDictionaryRepository } from 'src/application/repositories/dictionary-repository.interface';
import { Dictionary } from 'src/domain/entities/dictionary';

import { CreateDictionaryInput } from 'src/shared/dtos/dictionary/create-dictionary.dto';
import { Result } from 'src/shared/utils/result';

@Injectable()
export class CreateDictionaryUseCase {
  constructor(private readonly dictionaryRepository: IDictionaryRepository) {}

  async execute(dto: CreateDictionaryInput): Promise<Result<Dictionary>> {
    const dictionary = Dictionary.create(dto.name);
    return Result.success(await this.dictionaryRepository.save(dictionary));
  }
}
