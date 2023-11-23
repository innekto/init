import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

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

  @ApiOperation({ summary: 'get all' })
  @Get()
  getAll() {
    return this.usersServise.getAll();
  }
}
