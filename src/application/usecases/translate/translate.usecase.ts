import { ITranslateService } from '@application/services/translate.interface';
import { Injectable } from '@nestjs/common';
import { ITranslateResponse } from '@shared/types/translate-response';
import { Result } from '@shared/utils/result';

@Injectable()
export class TranslateUseCase {
  constructor(private readonly translateService: ITranslateService) {}

  async execute(
    text: string,
    from: string,
    to: string,
    alternatives: number,
  ): Promise<Result<ITranslateResponse>> {
    const translation = await this.translateService.translate(
      text,
      from,
      to,
      alternatives,
    );
    if (!translation) {
      return Result.failure('Translation failed');
    }

    return Result.success(translation);
  }
}
