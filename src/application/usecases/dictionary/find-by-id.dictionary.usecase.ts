import { Injectable } from '@nestjs/common';
import { IDictionaryRepository } from 'src/application/repositories/dictionary-repository.interface';
import { Dictionary } from 'src/domain/entities/dictionary';
import { Result } from 'src/shared/utils/result';

@Injectable()
export class FindByIdDictionaryUseCase {
  constructor(private readonly dictionaryRepository: IDictionaryRepository) {}

  async execute(userId: string, id: string): Promise<Result<Dictionary>> {
    const dictionary = await this.dictionaryRepository.findById(userId, id);
    if (!dictionary) {
      return Result.failure('Dictionary does not exist');
    }
    return Result.success(dictionary);
  }
}
