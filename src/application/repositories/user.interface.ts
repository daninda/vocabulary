import { User } from '@domain/user';

export abstract class IUserRepository {
  abstract save(user: User): Promise<User>;
  abstract findById(id: string): Promise<User | null>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract findAll(): Promise<User[]>;
}
