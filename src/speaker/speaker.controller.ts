import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { SpeakerService } from './speaker.service';
import { CreateSpeakerDto } from './dto/create-speaker.dto';
import { UpdateSpeakerDto } from './dto/update-speaker.dto';

import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
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
  async create(@Body() createSpeakerDto: CreateSpeakerDto) {
    return this.speakerService.create(createSpeakerDto);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(AdminAuthGuard)
  @ApiOperation({ summary: 'update speaker by admin' })
  @ApiResponse({ type: Speaker })
  async update(
    @Param('id') id: number,
    @Body() updateSpeakerDto: UpdateSpeakerDto,
  ) {
    return this.speakerService.update(id, updateSpeakerDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AdminAuthGuard)
  @ApiOperation({ summary: 'delete speaker by admin' })
  remove(@Param('id') id: number) {
    return this.speakerService.remove(id);
  }
}
