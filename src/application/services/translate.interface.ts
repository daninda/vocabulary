import { ITranslateResponse } from '@shared/types/translate-response';

export abstract class ITranslateService {
  abstract translate(
    text: string,
    from: string,
    to: string,
    alternatives: number,
  ): Promise<ITranslateResponse>;
}
