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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { RefreshJwtAuthGuard } from './guards/refresh-jwt-auth.guard';
// import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { AuthConfirmEmailDto } from './dto/auth-confirm-email.dto';

import { Request } from 'express';
import { AuthLoginDto } from './dto/auth-login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { User } from 'src/common/decorators/user.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'login by user' })
  @ApiResponse({
    status: HttpStatus.OK,
    content: {
      'application/json': {
        example: {
          token: 'string',
          tokenExpires: 'number',
          refreshToken: 'refreshToken',
          user: {
            id: 'id',
            name: 'John Doe',
            phone: '+380509999999',
            email: 'email@examole.com',
            isConfirm: 'boolean',
            online: 'boolean',
            createdAt: 'Date',
            updatedAt: 'Date',
            deletedAt: 'Date or null',
          },
        },
      },
    },
  })
  async login(@Body() loginDto: AuthLoginDto) {
    return await this.authService.login(loginDto);
  }

  @Post('admin/login')
  @ApiOperation({ summary: 'login by admin' })
  async adminLogin(@Body() loginDto: AuthLoginDto) {
    return await this.authService.adminLogin(loginDto);
  }

  @Post('email/register')
  @ApiOperation({ summary: 'user registration' })
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() createUserDto: AuthRegisterDto): Promise<void> {
    return this.authService.register(createUserDto);
  }

  @Post('email/confirm')
  @ApiOperation({ summary: 'user email confirmation' })
  @ApiResponse({
    status: HttpStatus.OK,
    content: {
      'application/json': {
        example: {
          token: 'string',
          tokenExpires: 'number',
          refreshToken: 'refreshToken',
          user: {
            id: 'id',
            name: 'John Doe',
            phone: '+380509999999',
            email: 'email@examole.com',
            isConfirm: 'boolean',
            online: 'boolean',
            createdAt: 'Date',
            updatedAt: 'Date',
            deletedAt: 'Date or null',
          },
        },
      },
    },
  })
  async confirmEmail(
    @Body() confirmEmailDto: AuthConfirmEmailDto,
  ): Promise<object> {
    return this.authService.confirmEmail(confirmEmailDto.hash);
  }

  @ApiBearerAuth()
  @Post('refresh')
  @ApiOperation({ summary: "refreshing user's tokens when token expired " })
  @ApiResponse({
    status: HttpStatus.OK,
    content: {
      'application/json': {
        example: {
          token: 'string',
          tokenExpires: 'number',
          refreshToken: 'refreshToken',
        },
      },
    },
  })
  @UseGuards(RefreshJwtAuthGuard)
  async refreshToken(@User('id') userId: number) {
    return this.authService.refreshToken(userId);
  }

  @ApiBearerAuth()
  @Post('logout')
  @ApiOperation({ summary: 'logout by user' })
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async logout(@User('id') userId: number) {
    return this.authService.logout(userId);
  }

  // @Post('/forgotPassword')
  // async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
  //   return this.authService.forgotPassword(forgotPasswordDto);
  // }
}
