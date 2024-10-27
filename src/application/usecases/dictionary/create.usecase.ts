import { IDictionaryRepository } from '@application/repositories/dictionary.interface';
import { Dictionary } from '@domain/dictionary';
import { Injectable } from '@nestjs/common';
import { Result } from '@shared/utils/result';

@Injectable()
export class CreateDictionaryUseCase {
  constructor(private readonly dictionaryRepository: IDictionaryRepository) {}

  async execute(name: string, userId: string): Promise<Result<Dictionary>> {
    const dictionary = Dictionary.create(name, userId);
    return Result.success(await this.dictionaryRepository.save(dictionary));
  }
}
