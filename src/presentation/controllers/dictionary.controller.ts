import { Body, Controller, Post } from '@nestjs/common';
import { CreateDictionaryUseCase } from 'src/application/usecases/dictionary/create.dictionary.usecase';
import { Dictionary } from 'src/domain/entities/dictionary';
import { CreateDictionaryVM } from '../view-models/dictionary/create-dictionary.vm';

@Controller('dictionary')
export class DictionaryController {
  constructor(
    private readonly createDictionaryUseCase: CreateDictionaryUseCase,
  ) {}

  @Post()
  async create(
    @Body() createDictionary: CreateDictionaryVM,
  ): Promise<Dictionary> {
    return this.createDictionaryUseCase.execute(
      CreateDictionaryVM.fromViewModel(createDictionary),
    );
  }
}
