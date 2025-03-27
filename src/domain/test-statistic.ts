import { v4 as uuidv4 } from 'uuid';

export class TestStatistic {
  constructor(
    public id: string,
    public dictionaryEntryId: string,
    public isRight: boolean,
    public createAt: Date,
  ) {}

  static create(dictionaryEntryId: string, isRight: boolean): TestStatistic {
    return new TestStatistic(uuidv4(), dictionaryEntryId, isRight, new Date());
  }
}
