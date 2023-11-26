import {
  Controller,
  Post,
  UseGuards,
  Body,
  HttpCode,
  HttpStatus,
  Get,
  Req,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
// import { JwtAuthGuard } from './guards/auth/jwt-auth.guard';
// import { LocalAuthGuard } from './guards/auth/local-auth.guard';
import { RefreshJwtAuthGuard } from './guards/auth/refresh-jwt-auth.guard';
// import { RefreshDto } from './strategies/dto/refreshToken.dto';
import { ForgotPasswordDto } from './guards/auth/dto/forgot-password.dto';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { AuthConfirmEmailDto } from './dto/auth-confirm-email.dto';
import { JwtAuthGuard } from './guards/auth/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { GoogleAuthGuard } from './guards/auth/google.guard';
import { Request } from 'express';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('email/register')
  // @HttpCode(HttpStatus.NO_CONTENT)
  async register(@Body() createUserDto: AuthRegisterDto) {
    return this.authService.register(createUserDto);
  }

  @Post('email/confirm')
  @HttpCode(HttpStatus.OK)
  async confirmEmail(
    @Body() confirmEmailDto: AuthConfirmEmailDto,
  ): Promise<object> {
    return this.authService.confirmEmail(confirmEmailDto.hash);
  }

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async googleAuth(@Req() req) {
    return await { message: 'Hello' };
  }

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  async googleAuthRedirect(@Req() req: Request) {
    return await this.authService.googleLogin(req);
  }

  @UseGuards(RefreshJwtAuthGuard)
  @Post('refresh')
  async refreshToken(@Req() req): Promise<{ token: string }> {
    return this.authService.refreshToken(req.user);
  }

  // @Post('/forgotPassword')
  // async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
  //   return this.authService.forgotPassword(forgotPasswordDto);
  // }
}
