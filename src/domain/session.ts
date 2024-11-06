import { v4 as uuidv4 } from 'uuid';

export class Session {
  constructor(
    public id: string,
    public userId: string,
    public fingerprint: string,
    public refreshToken: string,
    public createAt: Date,
    public updateAt: Date,
  ) {}

  static create(
    userId: string,
    fingerprint: string,
    refreshToken: string,
  ): Session {
    return new Session(
      uuidv4(),
      userId,
      fingerprint,
      refreshToken,
      new Date(),
      new Date(),
    );
  }
}
