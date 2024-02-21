import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
// import { CreateAdminDto } from './dto/create-admin.dto';

import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AdminLoginDto } from './dto/login.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { AdminAuthGuard } from 'src/auth/guards/admin.guard';
import { User } from 'src/common/decorators/user.decorator';

@ApiTags('admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('login')
  @ApiOperation({ summary: 'login by admin' })
  adminLogin(@Body() loginDto: AdminLoginDto) {
    return this.adminService.adminLogin(loginDto);
  }

  // @Post('create')
  // create(@Body() createAdminDto: CreateAdminDto) {
  //   return this.adminService.create(createAdminDto);
  // }

  @Get('me')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'get admin profile' })
  @UseGuards(AdminAuthGuard)
  getMe(@User('adminId') adminId: number) {
    try {
      return this.adminService.getMe(adminId);
    } catch (error) {
      console.log('error', error);
    }
  }

  @Patch('me')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'update admin profile' })
  @UseGuards(AdminAuthGuard)
  update(
    @User('adminId') adminId: number,
    @Body() updateAdminDto: UpdateAdminDto,
  ) {
    return this.adminService.update(adminId, updateAdminDto);
  }

  @ApiBearerAuth()
  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AdminAuthGuard)
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
