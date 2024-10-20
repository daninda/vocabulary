import { Injectable } from '@nestjs/common';
import { IUserRepository } from 'src/application/repositories/user-repository.interface';
import { User } from 'src/domain/entities/user';
import { Result } from 'src/shared/utils/result';

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
