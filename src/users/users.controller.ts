import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { User } from './user.entity';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('users')
@Controller()
export class UsersController {
  constructor(private usersServise: UsersService) {}

  // @ApiOperation({ summary: 'user creation' })
  // @ApiResponse({ status: 201, type: User })
  // @UsePipes(new ValidationPipe())
  // @Post('user')
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.usersServise.create(createUserDto);
  // }
  @ApiBearerAuth()
  @ApiOperation({ summary: 'get all' })
  @UseGuards(JwtAuthGuard)
  @Get('users')
  getAll() {
    return this.usersServise.getAll();
  }
}
