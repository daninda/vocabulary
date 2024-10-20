import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateDictionaryOutputMapper } from 'src/domain/mappers/dictionary/create-dictionary.mapper';
import { FindAllDictionaryOutputMapper } from 'src/domain/mappers/dictionary/find-all-dictionary.mapper';
import {
  CreateDictionaryInput,
  CreateDictionaryOutput,
} from 'src/shared/dtos/dictionary/create-dictionary.dto';
import { FindAllDictionaryOutput } from 'src/shared/dtos/dictionary/find-all-dictionary.dto';
import {
  FindByIdDictionaryInput,
  FindByIdDictionaryOutput,
} from 'src/shared/dtos/dictionary/find-by-id-dictionary.dto';
import { CreateDictionaryUseCase } from 'src/application/usecases/dictionary/create.dictionary.usecase';
import { FindAllDictionaryUseCase } from 'src/application/usecases/dictionary/find-all.dictionary.usecase';
import { FindByIdDictionaryUseCase } from 'src/application/usecases/dictionary/find-by-id.dictionary.usecase';
import { FindByIdDictionaryOutputMapper } from 'src/domain/mappers/dictionary/find-by-id-dictionary.mapper';
import { AuthGuard } from '../guards/auth.guard';
import { UserId } from '../decorators/user-id.decorator';

@UseGuards(AuthGuard)
@Controller('dictionaries')
export class DictionaryController {
  constructor(
    private readonly createDictionaryUseCase: CreateDictionaryUseCase,
    private readonly findAllDictionaryUseCase: FindAllDictionaryUseCase,
    private readonly findByIdDictionaryUseCase: FindByIdDictionaryUseCase,
  ) {}

  @Post()
  async create(
    @Body() dto: CreateDictionaryInput,
    @UserId() userId: string,
  ): Promise<CreateDictionaryOutput> {
    const res = await this.createDictionaryUseCase.execute(dto.name, userId);

    if (!res.isSuccess) {
      throw new BadRequestException(res.error);
    }
    const dictionary = res.value;

    return CreateDictionaryOutputMapper.mapTo(dictionary);
  }

  @Get()
  async findAll(@UserId() userId: string): Promise<FindAllDictionaryOutput[]> {
    const res = await this.findAllDictionaryUseCase.execute(userId);

    if (!res.isSuccess) {
      throw new BadRequestException(res.error);
    }
    const dictionaries = res.value;

    return FindAllDictionaryOutputMapper.mapTo(dictionaries);
  }

  @Get(':id')
  async findById(
    @Param() dto: FindByIdDictionaryInput,
    @UserId() userId: string,
  ): Promise<FindByIdDictionaryOutput> {
    const res = await this.findByIdDictionaryUseCase.execute(userId, dto.id);

    if (!res.isSuccess) {
      throw new NotFoundException("Dictionary doesn't exist");
    }
    const dictionary = res.value;

    return FindByIdDictionaryOutputMapper.mapTo(dictionary);
  }
}
