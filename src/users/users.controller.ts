import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AdminAuthGuard } from 'src/auth/guards/admin.guard';
import { User } from 'src/common/decorators/user.decorator';

@ApiTags('users')
@ApiBearerAuth()
@Controller()
export class UsersController {
  constructor(private usersServise: UsersService) {}

  @ApiOperation({ summary: 'get all users by admin' })
  @UseGuards(AdminAuthGuard)
  @Get('users')
  async getAll() {
    return this.usersServise.getAll();
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async me(@User('id') userId: number) {
    return this.usersServise.me(userId);
  }
}
