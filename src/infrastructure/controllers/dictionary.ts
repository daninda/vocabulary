import {
  CreateDictionaryInput,
  CreateDictionaryOutput,
} from '@dtos/dictionary/create.dto';
import { FindAllDictionaryOutput } from '@dtos/dictionary/find-all.dto';
import {
  FindByIdDictionaryInput,
  FindByIdDictionaryOutput,
} from '@dtos/dictionary/find-by-id.dto';
import { UserId } from '@infrastructure/decorators/user-id';
import { AuthGuard } from '@infrastructure/guards/auth';
import { CreateDictionaryOutputMapper } from '@mappers/dictionary/create.mapper';
import { FindAllDictionaryOutputMapper } from '@mappers/dictionary/find-all.mapper';
import { FindByIdDictionaryOutputMapper } from '@mappers/dictionary/find-by-id.mapper';
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
import { CreateDictionaryUseCase } from '@usecases/dictionary/create.usecase';
import { FindAllDictionaryUseCase } from '@usecases/dictionary/find-all.usecase';
import { FindByIdDictionaryUseCase } from '@usecases/dictionary/find-by-id.usecase';

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
