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
import { LogoutUserUseCase } from 'src/application/usecases/auth/logout-user.usecase';
import { RefreshUseCase } from 'src/application/usecases/auth/refresh.usecase';
import { RegisterUserUseCase } from 'src/application/usecases/auth/register-user.usecase';
import { LoginUserInput } from 'src/shared/dtos/auth/login-user.dto';
import { LogoutInput } from 'src/shared/dtos/auth/logout.dto';
import { RefreshInput } from 'src/shared/dtos/auth/refresh.dto';
import { RegisterUserInput } from 'src/shared/dtos/auth/register-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly loginUserUseCase: LoginUserUseCase,
    private readonly refreshUseCase: RefreshUseCase,
    private readonly logoutUseCase: LogoutUserUseCase,
  ) {}

  @Post('register')
  async register(
    @Body() dto: RegisterUserInput,
    @Res({ passthrough: true }) res: Response,
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
    @Res({ passthrough: true }) res: Response,
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
    @Res({ passthrough: true }) res: Response,
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

  @Post('logout')
  async logout(
    @Req() req: Request,
    @Body() dto: LogoutInput,
    @Res({ passthrough: true }) res: Response,
  ): Promise<null> {
    const refreshToken = req.cookies['refreshToken'];
    if (!refreshToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }
    const result = await this.logoutUseCase.execute(
      refreshToken,
      dto.fingerprint,
    );
    if (!result.isSuccess) {
      throw new BadRequestException(result.error);
    }
    res.clearCookie('refreshToken');
    return null;
  }
}
