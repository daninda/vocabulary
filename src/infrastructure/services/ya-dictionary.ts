import { IYaDictionaryService } from '@application/services/ya-dictionary.interface';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IYaDictionaryResponse } from '@shared/types/ya-dictionary.response';

@Injectable()
export class YaDictionaryService implements IYaDictionaryService {
  constructor(private readonly configService: ConfigService) {}

  async lookup(text: string): Promise<IYaDictionaryResponse> {
    const key = this.configService.get<string>('YA_DICTIONARY_API_KEY');
    const lang = 'en-ru';

    const url = `https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${key}&lang=${lang}&text=${text}`;

    const res = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!res.ok) {
      return null;
    }

    const resjson = await res.json();

    return resjson as IYaDictionaryResponse;
  }
}
