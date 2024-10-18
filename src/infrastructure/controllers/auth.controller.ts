import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { LoginUserUseCase } from 'src/application/usecases/auth/login-user.usecase';
import { RefreshUseCase } from 'src/application/usecases/auth/refresh.usecase';
import { RegisterUserUseCase } from 'src/application/usecases/auth/register-user.usecase';
import { LoginUserInput } from 'src/shared/dtos/user/login-user.dto';
import { RefreshInput } from 'src/shared/dtos/user/refresh.dto';
import { RegisterUserInput } from 'src/shared/dtos/user/register-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly loginUserUseCase: LoginUserUseCase,
    private readonly refreshUseCase: RefreshUseCase,
  ) {}

  @Post('register')
  async register(
    @Body() dto: RegisterUserInput,
    @Res() res: Response,
  ): Promise<{ accessToken: string }> {
    const result = await this.registerUserUseCase.execute(dto);

    if (!result.isSuccess) {
      throw new BadRequestException(result.error);
    }
    const tokens = result.value;

    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return { accessToken: tokens.accessToken };
  }

  @Post('login')
  async login(
    @Body() dto: LoginUserInput,
    @Res() res: Response,
  ): Promise<{ accessToken: string }> {
    const result = await this.loginUserUseCase.execute(dto);

    if (!result.isSuccess) {
      throw new BadRequestException(result.error);
    }
    const tokens = result.value;

    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return { accessToken: tokens.accessToken };
  }

  @Post('refresh')
  async refresh(
    @Body() dto: RefreshInput,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<{ accessToken: string }> {
    const refreshToken = req.cookies['refreshToken'];
    if (!refreshToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const result = await this.refreshUseCase.execute(
      refreshToken,
      dto.fingerprint,
    );

    if (!result.isSuccess) {
      throw new BadRequestException(result.error);
    }
    const tokens = result.value;

    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return { accessToken: tokens.accessToken };
  }
}
