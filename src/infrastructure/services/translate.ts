import { ITranslateService } from '@application/services/translate.interface';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ITranslateResponse } from '@shared/types/translate-response';

@Injectable()
export class TranslateService implements ITranslateService {
  constructor(private readonly configService: ConfigService) {}

  async translate(
    text: string,
    from: string,
    to: string,
    alternatives: number,
  ): Promise<ITranslateResponse> {
    const url = this.configService.get<string>('TRANSLATE_URL');

    const translation = await fetch(url + '/translate', {
      method: 'POST',
      body: JSON.stringify({
        q: text,
        source: from,
        target: to,
        format: 'text',
        alternatives: alternatives,
        api_key: '',
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (!translation.ok) {
      return null;
    }

    return (await translation.json()) as ITranslateResponse;
  }
}
