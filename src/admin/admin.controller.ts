import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  UseGuards,
  Res,
  Request,
  BadRequestException,
  UseInterceptors,
  UploadedFile,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
} from '@nestjs/common';
import { AdminService } from './admin.service';
// import { CreateAdminDto } from './dto/create-admin.dto';

import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiConsumes,
} from '@nestjs/swagger';
import { AdminLoginDto } from './dto/login.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { AdminAuthGuard } from 'src/auth/guards/admin.guard';
import { User } from 'src/common/decorators/user.decorator';
import { Admin } from 'src/admin/entities/admin.entity';
import { adminLogin } from './response-example/responses';
import { EditPhotoDto } from './dto/edit-photo.dto';
import { Request as req, Response } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('admin')
@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    readonly authService: AuthService,
  ) {}

  @Post('login')
  @ApiOperation({ summary: 'login by admin' })
  @ApiResponse({
    content: adminLogin,
  })
  async adminLogin(
    @Body() loginDto: AdminLoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { token, tokenExpires, refreshToken, user } =
      await this.adminService.adminLogin(loginDto);

    response.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      sameSite: 'none',
      secure: true,
    });

    return { token, tokenExpires, user };
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
  async getMe(@User('id') adminId: number) {
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
    @User('id') adminId: number,
    @Body() updateAdminDto: UpdateAdminDto,
  ) {
    return this.adminService.update(adminId, updateAdminDto);
  }

  @Delete('avatar/delete')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'delete avatar' })
  @UseGuards(AdminAuthGuard)
  async deleteAvatar(@User('id') adminId: number) {
    return this.adminService.deleteAvatar(adminId);
  }

  @Post('logout')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'admin logout' })
  @ApiResponse({ type: Admin })
  @UseGuards(AdminAuthGuard)
  async logout(
    @User('id') adminId: number,
    @Res({ passthrough: true }) response: Response,
  ) {
    response.clearCookie('refresh_token');
    return this.adminService.adminLogout(adminId);
  }

  @Patch('editPhoto')
  @UseInterceptors(FileInterceptor('imagePath'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'edit avatar' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ type: Admin })
  @UseGuards(AdminAuthGuard)
  async editPhoto(
    @Body() payload: EditPhotoDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 10 * 1024 * 1024,
            message: 'max size of image is 10mb',
          }),
          new FileTypeValidator({ fileType: /image\// }),
        ],
      }),
    )
    image: Express.Multer.File,
    @User('id') adminId: number,
  ) {
    return this.adminService.editPhoto(image, adminId, payload);
  }

  @Post('refresh-token')
  async refreshToken(
    @Request() request: req,
    @Res({ passthrough: true }) response: Response,
  ) {
    if (!request.headers.cookie)
      throw new BadRequestException('Cookei is required!');

    const { tokenExpires, token, refreshToken } =
      await this.authService.refreshToken(request.headers.cookie.split('=')[1]);
    response.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      sameSite: 'none',
      secure: true,
    });

    return { token, tokenExpires };
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AdminAuthGuard)
  async remove(@Param('id') id: string) {
    console.log('id :>> ', id);
    return this.adminService.remove(+id);
  }
}
