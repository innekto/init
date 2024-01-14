import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AdminAuthGuard } from 'src/auth/guards/admin.guard';
import { User } from 'src/common/decorators/user.decorator';
import { UpdateUserDto } from './dto/update-user.dto';

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
  @Patch('me')
  @UseGuards(JwtAuthGuard)
  async updateUser(@User('id') userId: number, @Body() payload: UpdateUserDto) {
    return this.usersServise.updateUser(userId, payload);
  }
}
