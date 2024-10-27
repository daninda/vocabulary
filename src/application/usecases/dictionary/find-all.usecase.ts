import { IDictionaryRepository } from '@application/repositories/dictionary.interface';
import { Dictionary } from '@domain/dictionary';
import { Injectable } from '@nestjs/common';
import { Result } from '@shared/utils/result';

@Injectable()
export class FindAllDictionaryUseCase {
  constructor(private readonly dictionaryRepository: IDictionaryRepository) {}

  async execute(userId: string): Promise<Result<Dictionary[]>> {
    return Result.success(await this.dictionaryRepository.findAll(userId));
  }
}
