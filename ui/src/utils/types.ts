export type IPartOfSpeech =
  | 'noun' // существительное
  | 'adjective' // прилагательное
  | 'verb' // глагол
  | 'adverb' // наречие
  | 'preposition' // предлог
  | 'conjunction' // союз
  | 'interjection' // междометие
  | 'pronoun' // местоимение
  | 'other';

export interface IDictionaryEntry {
  id: string;
  dictionaryId: string;
  word: string;
  pos: IPartOfSpeech;
  translated: {
    word: string;
    pos: string;
    synonims?: string[];
    means?: string[];
    example?: {
      text: string;
      translated: string;
    };
  };
  rating: number;
  createAt: Date;
  updateAt: Date;
}

export interface IDictionary {
  id: string;
  name: string;
  createAt: Date;
  updateAt: Date;
}

export type Status = 'correct' | 'incorrect' | 'default';