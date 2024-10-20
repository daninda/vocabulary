import { Injectable } from '@nestjs/common';
import { IDictionaryRepository } from 'src/application/repositories/dictionary-repository.interface';
import { Dictionary } from 'src/domain/entities/dictionary';
import { Result } from 'src/shared/utils/result';

@Injectable()
export class FindAllDictionaryUseCase {
  constructor(private readonly dictionaryRepository: IDictionaryRepository) {}

  async execute(userId: string): Promise<Result<Dictionary[]>> {
    return Result.success(await this.dictionaryRepository.findAll(userId));
  }
}
