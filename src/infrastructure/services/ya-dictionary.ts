import { IYaDictionaryService } from '@application/services/ya-dictionary.interface';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PartOfSpeech } from '@shared/types/parts-of-speech';
import {
  IYaDictionaryDefinition,
  IYaDictionaryResponse,
} from '@shared/types/ya-dictionary.response';

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

  async lookupOne(
    text: string,
    partOfSpeech: PartOfSpeech,
  ): Promise<IYaDictionaryDefinition> {
    const response = await this.lookup(text);
    const definitions = response.def.filter((d) => d.pos === partOfSpeech);

    if (definitions.length === 0) {
      return null;
    }

    return definitions[0];
  }
}
