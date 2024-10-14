import { IDictionary } from '../entities/dictionary.interface';

export interface IDictionaryRepository {
  save(dictionary: IDictionary): Promise<IDictionary>;
  update(dictionary: IDictionary): Promise<IDictionary>;
  findById(id: string): Promise<IDictionary | null>;
  findAll(): Promise<IDictionary[]>;
}
