import { Dictionary } from '@domain/dictionary';

export abstract class IDictionaryRepository {
  abstract save(dictionary: Dictionary): Promise<Dictionary>;
  abstract findById(userId: string, id: string): Promise<Dictionary | null>;
  abstract findAll(userId: string): Promise<Dictionary[]>;
}
