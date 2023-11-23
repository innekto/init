import {
  Controller,
  Post,
  UseGuards,
  Request,
  // Get,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
// import { JwtAuthGuard } from './guards/auth/jwt-auth.guard';
import { LocalAuthGuard } from './guards/auth/local-auth.guard';
import { RefreshJwtAuthGuard } from './guards/auth/refresh-jwt-auth.guard';
// import { RefreshDto } from './strategies/dto/refreshToken.dto';
import { ForgotPasswordDto } from './guards/auth/dto/forgot-password.dto';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { AuthConfirmEmailDto } from './dto/auth-confirm-email.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  // @Get('profile')
  // @UseGuards(JwtAuthGuard)
  // getProfile(@Request() req): any {
  //   return req.user;
  // }

  @UseGuards(RefreshJwtAuthGuard)
  @Post('refresh')
  async refreshToken(@Request() req): Promise<{ token: string }> {
    return this.authService.refreshToken(req.user);
  }

  @Post('/forgotPassword')
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.forgotPassword(forgotPasswordDto);
  }
}
