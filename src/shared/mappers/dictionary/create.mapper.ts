import { Dictionary } from '@domain/dictionary';
import { CreateDictionaryOutput } from '@dtos/dictionary/create.dto';

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
