import { Dictionary } from '../../../dictionary/entities/dictionary';

export abstract class IDictionaryRepository {
  abstract save(dictionary: Dictionary): Promise<Dictionary>;
  abstract findById(id: string): Promise<Dictionary | null>;
  abstract findAll(): Promise<Dictionary[]>;
}
