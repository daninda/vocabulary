import { GenerateTestInput, GenerateTestOutput } from '@dtos/test/generate.dto';
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

@UseGuards(AuthGuard)
@Controller('test')
export class TestController {
  constructor(private readonly generateTestUseCase: GenerateTestUseCase) {}

  @HttpCode(200)
  @Post('generate')
  async translateText(
    @Body() dto: GenerateTestInput,
  ): Promise<GenerateTestOutput> {
    const result = await this.generateTestUseCase.execute(
      dto.dictionaryId,
      dto.wrongsCount,
    );

    if (!result.isSuccess) {
      throw new BadRequestException(result.error);
    }

    return result.value;
  }
}
