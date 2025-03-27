import {
  ChangeDictionaryDictionaryEntryInput,
  ChangeDictionaryDictionaryEntryOutput,
} from '@dtos/dictionary-entry/change-dictionary.dto';
import {
  CheckExistingDictionaryEntryInput,
  CheckExistingDictionaryEntryOutput,
} from '@dtos/dictionary-entry/check-existence.dto';
import {
  CreateDictionaryEntryInput,
  CreateDictionaryEntryOutput,
} from '@dtos/dictionary-entry/create.dto';
import { DeleteDictionaryEntryInput } from '@dtos/dictionary-entry/delete.dto';
import {
  FindAllDictionaryEntryInput,
  FindAllDictionaryEntryOutput,
} from '@dtos/dictionary-entry/find-all.dto';
import {
  FindByIdDictionaryEntryInput,
  FindByIdDictionaryEntryOutput,
} from '@dtos/dictionary-entry/find-by-id.dto';
import {
  LookupDictionaryEntryInput,
  LookupDictionaryEntryOutput,
} from '@dtos/dictionary-entry/lookup.dto';
import {
  RatingDictionaryEntryInput,
  RatingDictionaryEntryOutput,
} from '@dtos/dictionary-entry/rating.dto';
import { AuthGuard } from '@infrastructure/guards/auth';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ChangeDictionaryDictionaryEntryUseCase } from '@usecases/dictionary-entry/change-dictionary.usecase';
import { CheckExistingDictionaryEntryUseCase } from '@usecases/dictionary-entry/check-existence.usecase';
import { CreateDictionaryEntryUseCase } from '@usecases/dictionary-entry/create.usecase';
import { DeleteDictionayEntryUsecase } from '@usecases/dictionary-entry/delete.usecase';
import { FindAllDictionaryEntryUseCase } from '@usecases/dictionary-entry/find-all.usecase';
import { FindByIdDictionayEntryUsecase } from '@usecases/dictionary-entry/find-by-id.usecase';
import { LookupDictionaryEntryUsecase } from '@usecases/dictionary-entry/lookup.usecase';
import { RatingDownDictionaryEntryUsecase } from '@usecases/dictionary-entry/rating-down.usecase';
import { RatingUpDictionaryEntryUsecase } from '@usecases/dictionary-entry/rating-up.usecase';

@UseGuards(AuthGuard)
@Controller('dictionary-entries')
export class DictionaryEntryController {
  constructor(
    private readonly createDictionaryEntryUseCase: CreateDictionaryEntryUseCase,
    private readonly findAllDictionaryEntryUseCase: FindAllDictionaryEntryUseCase,
    private readonly findByIdDictionaryEntryUseCase: FindByIdDictionayEntryUsecase,
    private readonly deleteDictionaryEntryUseCase: DeleteDictionayEntryUsecase,
    private readonly changeDictionaryDictionaryEntryUseCase: ChangeDictionaryDictionaryEntryUseCase,
    private readonly ratingUpDictionaryEntryUseCase: RatingUpDictionaryEntryUsecase,
    private readonly ratingDownDictionaryEntryUseCase: RatingDownDictionaryEntryUsecase,
    private readonly lookupDictionaryEntryUseCase: LookupDictionaryEntryUsecase,
    private readonly checkExistingDictionaryEntryUseCase: CheckExistingDictionaryEntryUseCase,
  ) {}

  @Post('lookup')
  @HttpCode(200)
  async lookupDictionaryEntry(
    @Body() dto: LookupDictionaryEntryInput,
  ): Promise<LookupDictionaryEntryOutput> {
    const result = await this.lookupDictionaryEntryUseCase.execute(dto.word);

    if (!result.isSuccess) {
      throw new BadRequestException(result.error);
    }

    return result.value;
  }

  @Post()
  async createDictionaryEntry(
    @Body() dto: CreateDictionaryEntryInput,
  ): Promise<CreateDictionaryEntryOutput> {
    const result = await this.createDictionaryEntryUseCase.execute(
      dto.dictionaryId,
      dto.word,
      dto.partOfSpeech,
    );

    if (!result.isSuccess) {
      throw new BadRequestException(result.error);
    }

    return result.value;
  }

  @Get()
  async findAllDictionaryEntry(
    @Query() dto: FindAllDictionaryEntryInput,
  ): Promise<FindAllDictionaryEntryOutput> {
    const result = await this.findAllDictionaryEntryUseCase.execute(
      dto.dictionaryId,
      dto.sort,
      dto.search,
    );

    if (!result.isSuccess) {
      throw new BadRequestException(result.error);
    }

    return result.value;
  }

  @Get(':id')
  async findByIdDictionaryEntry(
    @Param() dto: FindByIdDictionaryEntryInput,
  ): Promise<FindByIdDictionaryEntryOutput> {
    const result = await this.findByIdDictionaryEntryUseCase.execute(dto.id);

    if (!result.isSuccess) {
      throw new BadRequestException(result.error);
    }

    return result.value;
  }

  @Delete(':id')
  async deleteDictionaryEntry(
    @Param() dto: DeleteDictionaryEntryInput,
  ): Promise<void> {
    const result = await this.deleteDictionaryEntryUseCase.execute(dto.id);

    if (!result.isSuccess) {
      throw new BadRequestException(result.error);
    }

    return;
  }

  @Put('/change-dictionary')
  async changeDictionaryDictionaryEntry(
    @Body() dto: ChangeDictionaryDictionaryEntryInput,
  ): Promise<ChangeDictionaryDictionaryEntryOutput> {
    const result = await this.changeDictionaryDictionaryEntryUseCase.execute(
      dto.id,
      dto.dictionaryId,
    );

    if (!result.isSuccess) {
      throw new BadRequestException(result.error);
    }

    return result.value;
  }

  @Put('/rating-up')
  async ratingUpDictionaryEntry(
    @Body() dto: RatingDictionaryEntryInput,
  ): Promise<RatingDictionaryEntryOutput> {
    const result = await this.ratingUpDictionaryEntryUseCase.execute(dto.id);

    if (!result.isSuccess) {
      throw new BadRequestException(result.error);
    }

    return result.value;
  }

  @Put('/rating-down')
  async ratingDownDictionaryEntry(
    @Body() dto: RatingDictionaryEntryInput,
  ): Promise<RatingDictionaryEntryOutput> {
    const result = await this.ratingDownDictionaryEntryUseCase.execute(dto.id);

    if (!result.isSuccess) {
      throw new BadRequestException(result.error);
    }

    return result.value;
  }

  @Post('/check-existence')
  async checkExistingDictionaryEntry(
    @Body() dto: CheckExistingDictionaryEntryInput,
  ): Promise<CheckExistingDictionaryEntryOutput> {
    const result = await this.checkExistingDictionaryEntryUseCase.execute({
      checkWords: dto.checkWords,
      dictionaryId: dto.dictionaryId,
    });

    if (!result.isSuccess) {
      throw new BadRequestException(result.error);
    }

    return result.value;
  }
}
