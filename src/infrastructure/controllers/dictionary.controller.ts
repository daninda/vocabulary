import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { CreateDictionaryOutputMapper } from 'src/domain/mappers/dictionary/create-dictionary.mapper';
import { FindAllDictionaryOutputMapper } from 'src/domain/mappers/dictionary/find-all-dictionary.mapper';
import {
  CreateDictionaryInput,
  CreateDictionaryOutput,
} from 'src/shared/dtos/dictionary/create-dictionary.dto';
import { FindAllDictionaryOutput } from 'src/shared/dtos/dictionary/find-all-dictionary.dto';
import { FindByIdDictionaryInput } from 'src/shared/dtos/dictionary/find-by-id-dictionary.dto';
import { CreateDictionaryUseCase } from 'src/usecases/dictionary/create.dictionary.usecase';
import { FindAllDictionaryUseCase } from 'src/usecases/dictionary/find-all.dictionary.usecase';
import { FindByIdDictionaryUseCase } from 'src/usecases/dictionary/find-by-id.dictionary.usecase';

@Controller('dictionary')
export class DictionaryController {
  constructor(
    private readonly createDictionaryUseCase: CreateDictionaryUseCase,
    private readonly findAllDictionaryUseCase: FindAllDictionaryUseCase,
    private readonly findByIdDictionaryUseCase: FindByIdDictionaryUseCase,
  ) {}

  @Post()
  async create(
    @Body() dto: CreateDictionaryInput,
  ): Promise<CreateDictionaryOutput> {
    const dictionary = await this.createDictionaryUseCase.execute(dto);
    return CreateDictionaryOutputMapper.mapTo(dictionary);
  }

  @Get()
  async findAll(): Promise<FindAllDictionaryOutput[]> {
    const dictionaries = await this.findAllDictionaryUseCase.execute();
    return FindAllDictionaryOutputMapper.mapTo(dictionaries);
  }

  @Get(':id')
  async findById(@Param() dto: FindByIdDictionaryInput) {
    const dictionary = await this.findByIdDictionaryUseCase.execute(dto);
    if (!dictionary) {
      throw new NotFoundException("Dictionary doesn't exist");
    }
    return dictionary;
  }
}
