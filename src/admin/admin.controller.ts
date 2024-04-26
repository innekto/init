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

import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { AdminLoginDto } from './dto/login.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { AdminAuthGuard } from 'src/auth/guards/admin.guard';
import { User } from 'src/common/decorators/user.decorator';
import { Admin } from 'src/admin/entities/admin.entity';
import { adminLogin } from './response-example/responses';

@ApiTags('admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('login')
  @ApiOperation({ summary: 'login by admin' })
  // @ApiResponse({ type: Admin })
  @ApiResponse({
    content: adminLogin,
  })
  async adminLogin(@Body() loginDto: AdminLoginDto) {
    return this.adminService.adminLogin(loginDto);
  }

  // @Post('create')
  // create(@Body() createAdminDto: CreateAdminDto) {
  //   return this.adminService.create(createAdminDto);
  // }

  @Get('me')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'get admin profile' })
  @ApiResponse({ type: Admin })
  @UseGuards(AdminAuthGuard)
  async getMe(@User('adminId') adminId: number) {
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
  async update(
    @User('adminId') adminId: number,
    @Body() updateAdminDto: UpdateAdminDto,
  ) {
    return this.adminService.update(adminId, updateAdminDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AdminAuthGuard)
  async remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }

  @Post('logout')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'admin logout' })
  @ApiResponse({ type: Admin })
  @UseGuards(AdminAuthGuard)
  async logout(@User('adminId') adminId: number) {
    return this.adminService.adminLogout(adminId);
  }
}
