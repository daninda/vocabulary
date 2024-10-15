import {
  CreateDictionaryControllerInput,
  CreateDictionaryControllerOutput,
} from '../adapters/dto/create-dictionary.controller.dto';
import {
  CreateDictionaryUsecaseInput,
  CreateDictionaryUseCaseOutput,
} from '../usecases/dto/create-dictionary.usecase.dto';

export class DictionaryMapper {
  static fromControllerToUseCase(
    dictionaryDTO: CreateDictionaryControllerInput,
  ): CreateDictionaryUsecaseInput {
    return {
      name: dictionaryDTO.name,
    };
  }

  static fromUseCaseToController(
    dictionary: CreateDictionaryUseCaseOutput,
  ): CreateDictionaryControllerOutput {
    return {
      id: dictionary.id,
      name: dictionary.name,
      createAt: dictionary.createAt,
      updateAt: dictionary.updateAt,
    };
  }
}
