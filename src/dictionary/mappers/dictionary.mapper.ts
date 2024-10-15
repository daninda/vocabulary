import {
  CreateDictionaryControllerInput,
  CreateDictionaryControllerOutput,
} from '../adapters/dto/create-dictionary.controller.dto';
import { Dictionary } from '../entities/dictionary';
import { CreateDictionaryUsecaseInput } from '../usecases/dto/create-dictionary.usecase.dto';

export class DictionaryMapper {
  static fromControllerToUseCase(
    dictionaryDTO: CreateDictionaryControllerInput,
  ): CreateDictionaryUsecaseInput {
    return {
      name: dictionaryDTO.name,
    };
  }

  static fromEntityToController(
    dictionary: Dictionary,
  ): CreateDictionaryControllerOutput {
    return {
      id: dictionary.id,
      name: dictionary.name,
      createAt: dictionary.createAt,
      updateAt: dictionary.updateAt,
    };
  }
}
