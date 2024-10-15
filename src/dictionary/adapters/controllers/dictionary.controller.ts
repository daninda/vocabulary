import { Body, Controller, Post } from '@nestjs/common';
import { CreateDictionaryUseCase } from 'src/dictionary/usecases/create.dictionary.usecase';
import {
  CreateDictionaryControllerInput,
  CreateDictionaryControllerOutput,
} from '../dto/create-dictionary.controller.dto';
import { DictionaryMapper } from 'src/dictionary/mappers/dictionary.mapper';

@Controller('dictionary')
export class DictionaryController {
  constructor(
    private readonly createDictionaryUseCase: CreateDictionaryUseCase,
  ) {}

  @Post()
  async create(
    @Body() dto: CreateDictionaryControllerInput,
  ): Promise<CreateDictionaryControllerOutput> {
    const dictionary = await this.createDictionaryUseCase.execute(
      DictionaryMapper.fromControllerToUseCase(dto),
    );
    return DictionaryMapper.fromEntityToController(dictionary);
  }
}
