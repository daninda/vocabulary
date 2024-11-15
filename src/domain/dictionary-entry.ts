import { PartOfSpeech } from '@shared/types/parts-of-speech';
import { v4 as uuidv4 } from 'uuid';

export class DictionaryEntry {
  constructor(
    public id: string,
    public dictionaryId: string,
    public word: string,
    public pos: PartOfSpeech,
    public translated: {
      word: string;
      pos: string;
      synonims?: string[];
      means?: string[];
      example?: {
        text: string;
        translated: string;
      };
    },
    public rating: number,

    public createAt: Date,
    public updateAt: Date,
  ) {}

  changeRating(rating: number): void {
    this.rating += rating;
    this.updateAt = new Date();
  }

  static create(
    dictionaryId: string,
    word: string,
    pos: PartOfSpeech,
    translated: {
      word: string;
      pos: string;
      synonims?: string[];
      means?: string[];
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
      new Date(),
      new Date(),
    );
  }
}
