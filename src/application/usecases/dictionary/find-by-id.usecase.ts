import { IDictionaryRepository } from '@application/repositories/dictionary.interface';
import { Dictionary } from '@domain/dictionary';
import { Injectable } from '@nestjs/common';
import { Result } from '@shared/utils/result';

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
