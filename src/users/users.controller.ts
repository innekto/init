import { Controller, Get, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { User } from './user.entity';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AdminAuthGuard } from 'src/auth/guards/admin.guard';

@ApiTags('users')
@Controller()
export class UsersController {
  constructor(private usersServise: UsersService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'get all users by admin' })
  @UseGuards(AdminAuthGuard)
  @Get('users')
  getAll() {
    return this.usersServise.getAll();
  }
}
