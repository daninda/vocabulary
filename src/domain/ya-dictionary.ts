import { IYaDictionaryResponse } from '@shared/types/ya-dictionary.response';

export class YaDictionary {
  constructor(
    public word: string, // "время"
    public pos: string, // "существительное"
    public synonims: string[], // ['раз', 'тайм']
    public means: string[], // ['timing', 'fold', 'half']
    public example?: {
      text: string; // "prehistoric time"
      translated: string; // "доисторическое время"
    },
  ) {}

  static fromResponse(response: IYaDictionaryResponse): YaDictionary {
    return new YaDictionary(
      response.definitions[0].text,
      response.definitions[0].pos,
      response.definitions[0].tr[0].syn.map((s) => s.text),
      response.definitions[0].tr[0].mean.map((m) => m.text),
      {
        text: response.definitions[0].tr[0].ex[0].text,
        translated: response.definitions[0].tr[0].ex[0].tr[0].text,
      },
    );
  }
}
