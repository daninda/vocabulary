import { Dictionary } from 'src/domain/entities/dictionary';
import { FindByIdDictionaryOutput } from 'src/shared/dtos/dictionary/find-by-id-dictionary.dto';

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
