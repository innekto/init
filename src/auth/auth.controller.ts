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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { RefreshJwtAuthGuard } from './guards/refresh-jwt-auth.guard';
// import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { AuthConfirmEmailDto } from './dto/auth-confirm-email.dto';
import { GoogleAuthGuard } from './guards/google.guard';
import { Request } from 'express';
import { AuthLoginDto } from './dto/auth-login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: AuthLoginDto) {
    return await this.authService.login(loginDto.email, loginDto.password);
  }

  @Post('admin/login')
  async adminLogin(@Body() loginDto: AuthLoginDto) {
    return await this.authService.adminLogin(loginDto.email, loginDto.password);
  }

  @Post('email/register')
  @HttpCode(HttpStatus.OK)
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
  async googleAuth(@Req() req: Request) {
    return req.user;
  }

  @Get('google/redirect')
  @HttpCode(HttpStatus.OK)
  @UseGuards(GoogleAuthGuard)
  async googleAuthRedirect(@Req() req: Request) {
    return await this.authService.googleLogin(req);
  }

  @ApiBearerAuth()
  @Post('refresh')
  @UseGuards(RefreshJwtAuthGuard)
  async refreshToken(@Req() req) {
    return this.authService.refreshToken(req.user.id);
  }

  // @Post('/forgotPassword')
  // async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
  //   return this.authService.forgotPassword(forgotPasswordDto);
  // }
}
