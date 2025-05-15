import * as bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

export class User {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public passwordHash: string,
    public createAt: Date,
    public updateAt: Date,
  ) {}

  checkPassword(password: string): boolean {
    return bcrypt.compareSync(password, this.passwordHash);
  }

  static create(name: string, email: string, password: string): User {
    const passwordHash = bcrypt.hashSync(password, 10);
    return new User(
      uuidv4(),
      name,
      email,
      passwordHash,
      new Date(),
      new Date(),
    );
  }
}
