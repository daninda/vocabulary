import { Injectable } from '@nestjs/common';
import { IDictionaryRepository } from 'src/application/repositories/dictionary-repository.interface';
import { Dictionary } from 'src/domain/entities/dictionary';
import { Result } from 'src/shared/utils/result';

@Injectable()
export class CreateDictionaryUseCase {
  constructor(private readonly dictionaryRepository: IDictionaryRepository) {}

  async execute(name: string, userId: string): Promise<Result<Dictionary>> {
    const dictionary = Dictionary.create(name, userId);
    return Result.success(await this.dictionaryRepository.save(dictionary));
  }
}
