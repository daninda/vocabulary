import { Injectable } from '@nestjs/common';
import { IDictionaryRepository } from 'src/application/repositories/dictionary-repository.interface';
import { Dictionary } from 'src/domain/entities/dictionary';
import { FindByIdDictionaryInput } from 'src/shared/dtos/dictionary/find-by-id-dictionary.dto';
import { Result } from 'src/shared/utils/result';

@Injectable()
export class FindByIdDictionaryUseCase {
  constructor(private readonly dictionaryRepository: IDictionaryRepository) {}

  async execute(dto: FindByIdDictionaryInput): Promise<Result<Dictionary>> {
    const dictionary = await this.dictionaryRepository.findById(dto.id);
    if (!dictionary) {
      return Result.failure('Dictionary does not exist');
    }
    return Result.success(dictionary);
  }
}
