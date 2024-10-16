import { Dictionary } from 'src/domain/entities/dictionary';
import { FindAllDictionaryOutput } from 'src/shared/dtos/dictionary/find-all-dictionary.dto';

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
