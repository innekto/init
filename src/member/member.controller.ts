import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  UploadedFile,
} from '@nestjs/common';
import { MemberService } from './member.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';

import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
  ApiResponse,
  ApiConsumes,
} from '@nestjs/swagger';
import { AdminAuthGuard } from 'src/auth/guards/admin.guard';
import { Member } from './entities/member.entity';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('members')
@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Post()
  // @ApiBearerAuth()
  // @UseGuards(AdminAuthGuard)
  @UseInterceptors(FileInterceptor('imagePath'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'add member by admin' })
  @ApiResponse({ type: Member })
  async create(
    @Body() createMemberDto: CreateMemberDto,
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
  ) {
    return this.memberService.create(createMemberDto, image);
  }

  @Get()
  @ApiOperation({ summary: 'get our team/for render' })
  @ApiResponse({ type: [Member] })
  async findAll() {
    return this.memberService.findAll();
  }

  @Patch(':id')
  // @ApiBearerAuth()
  @UseInterceptors(FileInterceptor('imagePath'))
  @ApiConsumes('multipart/form-data')
  // @UseGuards(AdminAuthGuard)
  @ApiOperation({ summary: 'update member by admin' })
  @ApiResponse({ type: Member })
  async update(
    @Param('id') id: number,
    @Body() updateMemberDto: UpdateMemberDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 10 * 1024 * 1024,
            message: 'max size of image is 10mb',
          }),
          new FileTypeValidator({ fileType: /image\// }),
        ],
        fileIsRequired: false,
      }),
    )
    image: Express.Multer.File,
  ): Promise<Member> {
    return this.memberService.update(id, updateMemberDto, image);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AdminAuthGuard)
  @ApiOperation({ summary: 'delete member by admin' })
  remove(@Param('id') id: number) {
    return this.memberService.remove(id);
  }
}
