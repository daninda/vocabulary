import { IDictionaryEntryRepository } from '@application/repositories/dictionary-entry.interface';
import { Injectable } from '@nestjs/common';
import { Result } from '@shared/utils/result';

@Injectable()
export class DeleteDictionayEntryUsecase {
  constructor(
    private readonly dictionaryEntryRepository: IDictionaryEntryRepository,
  ) {}

  async execute(id: string): Promise<Result<null>> {
    await this.dictionaryEntryRepository.deleteById(id);

    return Result.success(null);
  }
}
