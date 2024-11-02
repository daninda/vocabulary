import { v4 as uuidv4 } from 'uuid';

export class DictionaryEntry {
  constructor(
    public id: string,
    public dictionaryId: string,
    public word: string,
    public pos: string,
    public translated: {
      word: string;
      pos: string;
      synonims: string[];
      means: string[];
      example?: {
        text: string;
        translated: string;
      };
    },
    public rating: number,

    public createAt: string,
    public updateAt: string,
  ) {}

  changeRating(rating: number): void {
    this.rating += rating;
  }

  static create(
    dictionaryId: string,
    word: string,
    pos: string,
    translated: {
      word: string;
      pos: string;
      synonims: string[];
      means: string[];
      example?: {
        text: string;
        translated: string;
      };
    },
  ): DictionaryEntry {
    return new DictionaryEntry(
      uuidv4(),
      dictionaryId,
      word,
      pos,
      translated,
      0,
      new Date().toUTCString(),
      new Date().toUTCString(),
    );
  }
}
