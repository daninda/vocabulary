import { GetUserInfoOutput } from '@dtos/user/get-info.dto';
import { UserId } from '@infrastructure/decorators/user-id';
import { AuthGuard } from '@infrastructure/guards/auth';
import { GetUserInfoOutputMapper } from '@mappers/user/get-info.mapper';
import {
  BadRequestException,
  Controller,
  Get,
  UseGuards,
} from '@nestjs/common';
import { GetUserInfoUseCase } from '@usecases/user/get-info.usecase';

@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly getUserInfoUseCase: GetUserInfoUseCase) {}

  @Get()
  async getUserInfo(@UserId() userId: string): Promise<GetUserInfoOutput> {
    const result = await this.getUserInfoUseCase.execute(userId);

    if (!result.isSuccess) {
      throw new BadRequestException(result.error);
    }

    return GetUserInfoOutputMapper.mapTo(result.value);
  }
}
