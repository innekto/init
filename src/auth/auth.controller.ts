import {
  Controller,
  Post,
  UseGuards,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { RefreshJwtAuthGuard } from './guards/refresh-jwt-auth.guard';
// import { ForgotPasswordDto } from './dto/forgot-password.dto';

import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { User } from 'src/common/decorators/user.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiBearerAuth()
  @Post('refresh')
  @ApiOperation({ summary: "refreshing user's tokens when token expired " })
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
