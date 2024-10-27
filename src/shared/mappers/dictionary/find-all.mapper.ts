import { Dictionary } from '@domain/dictionary';
import { FindAllDictionaryOutput } from '@dtos/dictionary/find-all.dto';

export class FindAllDictionaryOutputMapper {
  static mapTo(dictionaries: Dictionary[]): FindAllDictionaryOutput[] {
    return dictionaries.map((dictionary) => ({
      id: dictionary.id,
      name: dictionary.name,
      createAt: dictionary.createAt,
      updateAt: dictionary.updateAt,
    }));
  }
}
