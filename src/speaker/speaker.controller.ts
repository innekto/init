import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { SpeakerService } from './speaker.service';
import { CreateSpeakerDto } from './dto/create-speaker.dto';
import { UpdateSpeakerDto } from './dto/update-speaker.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiConsumes,
  ApiResponse,
} from '@nestjs/swagger';
import { AdminAuthGuard } from 'src/auth/guards/admin.guard';
import { Speaker } from './entities/speaker.entity';

@ApiTags('speakers')
@Controller('speaker')
export class SpeakerController {
  constructor(private readonly speakerService: SpeakerService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AdminAuthGuard)
  @ApiOperation({ summary: 'add speaker by admin' })
  @ApiResponse({ type: Speaker })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('imagePath'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createSpeakerDto: CreateSpeakerDto,
  ) {
    return this.speakerService.create(file, createSpeakerDto);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(AdminAuthGuard)
  @ApiOperation({ summary: 'update speaker by admin' })
  @ApiResponse({ type: Speaker })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('imagePath'))
  async update(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: number,
    @Body() updateSpeakerDto: UpdateSpeakerDto,
  ) {
    return this.speakerService.update(file, id, updateSpeakerDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AdminAuthGuard)
  @ApiOperation({ summary: 'delete speaker by admin' })
  remove(@Param('id') id: number) {
    return this.speakerService.remove(id);
  }
}
