import { v4 as uuidv4 } from 'uuid';

export class Dictionary {
  constructor(
    public id: string,
    public userId: string,
    public name: string,
    public createAt: string,
    public updateAt: string,
  ) {}

  static create(name: string, userId: string): Dictionary {
    return new Dictionary(
      uuidv4(),
      userId,
      name,
      new Date().toUTCString(),
      new Date().toUTCString(),
    );
  }
}
