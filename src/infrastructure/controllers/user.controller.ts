import {
  BadRequestException,
  Controller,
  Get,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { GetUserInfoUseCase } from 'src/application/usecases/user/get-user-info.usecase';
import { UserId } from '../decorators/user-id.decorator';
import { GetUserInfoOutput } from 'src/shared/dtos/user/get-user-info.dto';
import { GetUserInfoOutputMapper } from 'src/domain/mappers/user/get-user-info.mapper';

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
