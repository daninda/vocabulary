import { IUserRepository } from '@application/repositories/user.interface';
import { User } from '@domain/user';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '@postgres/entities/user';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async save(user: User): Promise<User> {
    const userEntity = await this.userRepository.save(this.toUserEntity(user));
    return this.toUser(userEntity);
  }

  async findById(id: string): Promise<User | null> {
    const userEntity = await this.userRepository.findOneBy({ id });
    return userEntity ? this.toUser(userEntity) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const userEntity = await this.userRepository.findOneBy({ email });
    return userEntity ? this.toUser(userEntity) : null;
  }

  async findAll(): Promise<User[]> {
    const userEntities = await this.userRepository.find();
    return userEntities.map((userEntity) => this.toUser(userEntity));
  }

  private toUserEntity(user: User): UserEntity {
    const userEntity = new UserEntity();

    userEntity.id = user.id;
    userEntity.name = user.name;
    userEntity.email = user.email;
    userEntity.passwordHash = user.passwordHash;
    userEntity.createAt = user.createAt;
    userEntity.updateAt = user.updateAt;

    return userEntity;
  }

  private toUser(userEntity: UserEntity): User {
    const user = new User(
      userEntity.id,
      userEntity.name,
      userEntity.email,
      userEntity.passwordHash,
      userEntity.createAt,
      userEntity.updateAt,
    );

    return user;
  }
}
