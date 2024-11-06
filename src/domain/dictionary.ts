import { v4 as uuidv4 } from 'uuid';

export class Dictionary {
  constructor(
    public id: string,
    public userId: string,
    public name: string,
    public createAt: Date,
    public updateAt: Date,
  ) {}

  static create(name: string, userId: string): Dictionary {
    return new Dictionary(uuidv4(), userId, name, new Date(), new Date());
  }
}
