import { IUserRepository } from '@application/repositories/user.interface';
import { User } from '@domain/user';
import { Injectable } from '@nestjs/common';
import { Result } from '@shared/utils/result';

@Injectable()
export class GetUserInfoUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(id: string): Promise<Result<User>> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      return Result.failure('User does not exist');
    }
    return Result.success(user);
  }
}
