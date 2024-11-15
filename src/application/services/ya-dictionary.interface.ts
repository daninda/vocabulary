import { PartOfSpeech } from '@shared/types/parts-of-speech';
import {
  IYaDictionaryDefinition,
  IYaDictionaryResponse,
} from '@shared/types/ya-dictionary.response';

export abstract class IYaDictionaryService {
  abstract lookup(text: string): Promise<IYaDictionaryResponse>;
  abstract lookupOne(
    text: string,
    partOfSpeech: PartOfSpeech,
  ): Promise<IYaDictionaryDefinition>;
}
