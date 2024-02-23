import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { WhatIsDoneService } from './what-is-done.service';
import { CreateWhatIsDoneDto } from './dto/create-what-is-done.dto';
import { UpdateWhatIsDoneDto } from './dto/update-what-is-done.dto';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('what-is-done')
@Controller('what-is-done')
export class WhatIsDoneController {
  constructor(private readonly whatIsDoneService: WhatIsDoneService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('imagePath'))
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createWhatIsDoneDto: CreateWhatIsDoneDto,
  ) {
    return this.whatIsDoneService.create(file, createWhatIsDoneDto);
  }

  @Get()
  findAll() {
    return this.whatIsDoneService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.whatIsDoneService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateWhatIsDoneDto: UpdateWhatIsDoneDto,
  ) {
    return this.whatIsDoneService.update(+id, updateWhatIsDoneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.whatIsDoneService.remove(+id);
  }
}
