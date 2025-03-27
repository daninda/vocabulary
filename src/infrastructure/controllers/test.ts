import { GenerateTestInput, GenerateTestOutput } from '@dtos/test/generate.dto';
import {
  GenerateWordWithErrorTestInput,
  GenerateWordWithErrorTestOutput,
} from '@dtos/test/generate-word-with-error';
import { AuthGuard } from '@infrastructure/guards/auth';
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GenerateTestUseCase } from '@usecases/test/generate.usecase';
import { GenerateWordWithErrorTestUseCase } from '@usecases/test/generate-word-with-error.usecase';

@UseGuards(AuthGuard)
@Controller('test')
export class TestController {
  constructor(
    private readonly generateTestUseCase: GenerateTestUseCase,
    private readonly generateWordWithErrorTestUseCase: GenerateWordWithErrorTestUseCase,
  ) {}

  @HttpCode(200)
  @Post('/generate')
  async generate(@Body() dto: GenerateTestInput): Promise<GenerateTestOutput> {
    const result = await this.generateTestUseCase.execute(
      dto.dictionaryId,
      dto.wrongsCount,
    );

    if (!result.isSuccess) {
      throw new BadRequestException(result.error);
    }

    return result.value;
  }

  @HttpCode(200)
  @Post('/generate-word-with-error')
  async generateWordWithError(
    @Body() dto: GenerateWordWithErrorTestInput,
  ): Promise<GenerateWordWithErrorTestOutput> {
    const result = await this.generateWordWithErrorTestUseCase.execute(
      dto.dictionaryId,
    );

    if (!result.isSuccess) {
      throw new BadRequestException(result.error);
    }

    return result.value;
  }
}
