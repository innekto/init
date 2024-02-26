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
  UseGuards,
} from '@nestjs/common';
import { WhatIsDoneService } from './what-is-done.service';
import { CreateWhatIsDoneDto } from './dto/create-what-is-done.dto';
import { UpdateWhatIsDoneDto } from './dto/update-what-is-done.dto';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { AdminAuthGuard } from 'src/auth/guards/admin.guard';

@ApiTags('what-is-done')
@Controller('what-is-done')
export class WhatIsDoneController {
  constructor(private readonly whatIsDoneService: WhatIsDoneService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AdminAuthGuard)
  @ApiOperation({ summary: 'post new cooool by admin' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('imagePath'))
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createWhatIsDoneDto: CreateWhatIsDoneDto,
  ) {
    return this.whatIsDoneService.create(file, createWhatIsDoneDto);
  }

  @Get(':category')
  @ApiOperation({ summary: 'get cooools by category/only for rendering' })
  findAll(@Param('category') category: string) {
    return this.whatIsDoneService.findAllInCategory(category);
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
