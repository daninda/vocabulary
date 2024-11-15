export interface IYaDictionaryResponse {
  def: IYaDictionaryDefinition[];
}

export interface IYaDictionaryDefinition {
  text: string;
  pos: string;
  tr: Translation[];
}

interface Translation {
  text: string;
  pos: string;
  syn?: Synonym[];
  mean?: Meaning[];
  ex?: TranslationExample[];
}

interface Synonym {
  text: string;
}

interface Meaning {
  text: string;
}

interface TranslationExample {
  text: string;
  tr: { text: string }[];
}
