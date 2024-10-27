import { TranslateInput, TranslateOutput } from '@dtos/translate/translate.dto';
import { BadRequestException, Body, Controller, Get } from '@nestjs/common';
import { TranslateUseCase } from '@usecases/translate/translate.usecase';

@Controller('translate')
export class TranslateController {
  constructor(private readonly translateUseCase: TranslateUseCase) {}

  @Get()
  async translateText(@Body() dto: TranslateInput): Promise<TranslateOutput> {
    const result = await this.translateUseCase.execute(
      dto.text,
      dto.from,
      dto.to,
      dto.alternatives,
    );

    if (!result.isSuccess) {
      throw new BadRequestException(result.error);
    }

    return result.value;
  }
}
