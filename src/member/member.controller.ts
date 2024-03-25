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
  UploadedFile,
} from '@nestjs/common';
import { MemberService } from './member.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiConsumes,
  ApiTags,
  ApiResponse,
} from '@nestjs/swagger';
import { AdminAuthGuard } from 'src/auth/guards/admin.guard';
import { Member } from './entities/member.entity';

@ApiTags('members')
@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AdminAuthGuard)
  @ApiOperation({ summary: 'add member by admin' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ type: Member })
  @UseInterceptors(FileInterceptor('imagePath'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createMemberDto: CreateMemberDto,
  ): Promise<Member> {
    return this.memberService.create(file, createMemberDto);
  }

  @Get()
  @ApiOperation({ summary: 'get our team/for render' })
  @ApiResponse({ type: [Member] })
  async findAll() {
    return this.memberService.findAll();
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(AdminAuthGuard)
  @ApiOperation({ summary: 'update member by admin' })
  @ApiResponse({ type: Member })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('imagePath'))
  async update(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: number,
    @Body() updateMemberDto: UpdateMemberDto,
  ): Promise<Member> {
    return this.memberService.update(file, id, updateMemberDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AdminAuthGuard)
  @ApiOperation({ summary: 'delete member by admin' })
  remove(@Param('id') id: number) {
    return this.memberService.remove(id);
  }
}
