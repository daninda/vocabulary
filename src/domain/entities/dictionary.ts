import { v4 as uuidv4 } from 'uuid';

export class Dictionary {
  constructor(
    public id: string,
    public name: string,
    public createAt: string,
    public updateAt: string,
  ) {}

  static create(name: string): Dictionary {
    return new Dictionary(
      uuidv4(),
      name,
      new Date().toUTCString(),
      new Date().toUTCString(),
    );
  }
}
