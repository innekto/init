import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Get,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { SpeakerService } from './speaker.service';
import { CreateSpeakerDto } from './dto/create-speaker.dto';
import { UpdateSpeakerDto } from './dto/update-speaker.dto';

import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiConsumes,
} from '@nestjs/swagger';
import { AdminAuthGuard } from 'src/auth/guards/admin.guard';
import { Speaker } from './entities/speaker.entity';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('speakers')
@Controller('speaker')
export class SpeakerController {
  constructor(private readonly speakerService: SpeakerService) {}

  @Get()
  @ApiBearerAuth()
  @UseGuards(AdminAuthGuard)
  @ApiOperation({ summary: 'get speakers by admin' })
  @ApiResponse({ type: Speaker })
  async getAll() {
    return this.speakerService.getAll();
  }

  @Post()
  // @ApiBearerAuth()
  // @UseGuards(AdminAuthGuard)
  @ApiOperation({ summary: 'add speaker by admin' })
  @UseInterceptors(FileInterceptor('imagePath'))
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ type: Speaker })
  async create(
    @Body() createSpeakerDto: CreateSpeakerDto,
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
    return this.speakerService.create(createSpeakerDto, image);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(AdminAuthGuard)
  @ApiOperation({ summary: 'update speaker by admin' })
  @ApiResponse({ type: Speaker })
  @UseInterceptors(FileInterceptor('imagePath'))
  @ApiConsumes('multipart/form-data')
  async update(
    @Param('id') id: number,
    @Body() updateSpeakerDto: UpdateSpeakerDto,
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
  ) {
    return this.speakerService.update(id, updateSpeakerDto, image);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AdminAuthGuard)
  @ApiOperation({ summary: 'delete speaker by admin' })
  remove(@Param('id') id: number) {
    return this.speakerService.remove(id);
  }
}
