import { Dictionary } from '@domain/dictionary';
import { FindByIdDictionaryOutput } from '@dtos/dictionary/find-by-id.dto';

export class FindByIdDictionaryOutputMapper {
  static mapTo(dictionary: Dictionary): FindByIdDictionaryOutput {
    return {
      id: dictionary.id,
      name: dictionary.name,
      createAt: dictionary.createAt,
      updateAt: dictionary.updateAt,
    };
  }
}
