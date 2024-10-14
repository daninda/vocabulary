import { Dictionary } from 'src/domain/entities/dictionary';

export class CreateDictionaryVM {
  name: string;

  static fromViewModel(createDictionaryVM: CreateDictionaryVM): Dictionary {
    const dictionary: Dictionary = new Dictionary();
    dictionary.name = createDictionaryVM.name;
    return dictionary;
  }
}
