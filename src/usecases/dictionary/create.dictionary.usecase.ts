import { Injectable } from '@nestjs/common';
import { Dictionary } from 'src/domain/entities/dictionary';
import { IDictionaryRepository } from 'src/domain/repositories/dictionary.repository.interface';
import { CreateDictionaryInput } from 'src/shared/dtos/dictionary/create-dictionary.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CreateDictionaryUseCase {
  constructor(private readonly dictionaryRepository: IDictionaryRepository) {}

  async execute(dto: CreateDictionaryInput): Promise<Dictionary> {
    const dictionary = new Dictionary(
      uuidv4(),
      dto.name,
      new Date().toUTCString(),
      new Date().toUTCString(),
    );
    return this.dictionaryRepository.save(dictionary);
  }
}
