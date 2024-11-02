import { IYaDictionaryResponse } from '@shared/types/ya-dictionary.response';

export abstract class IYaDictionaryService {
  abstract lookup(text: string): Promise<IYaDictionaryResponse>;
}
