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
    const newRating = this.rating + rating;
    if (newRating >= -4 && newRating <= 4) {
      this.rating = newRating;
    } else {
      if (newRating < -4) {
        this.rating = -4;
      } else if (newRating > 4) {
        this.rating = 4;
      }
    }
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
    const updatedAt = new Date();
    updatedAt.setMinutes(updatedAt.getMinutes() - 15);

    return new DictionaryEntry(
      uuidv4(),
      dictionaryId,
      word,
      pos,
      translated,
      -4,
      new Date(),
      updatedAt,
    );
  }
}
