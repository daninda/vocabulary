import { Dictionary } from '../../entities/dictionary';
import { CreateDictionaryOutput } from 'src/shared/dtos/dictionary/create-dictionary.dto';

export class CreateDictionaryOutputMapper {
  static mapTo(dictionary: Dictionary): CreateDictionaryOutput {
    return {
      id: dictionary.id,
      name: dictionary.name,
      createAt: dictionary.createAt,
      updateAt: dictionary.updateAt,
    };
  }
}
