import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DesertService } from './desert.service';
import { CreateDesertDto } from './dto/create-desert.dto';
import { UpdateDesertDto } from './dto/update-desert.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('deserts')
@Controller('desert')
export class DesertController {
  constructor(private readonly desertService: DesertService) {}

  @Post()
  create(@Body() createDesertDto: CreateDesertDto) {
    return this.desertService.create(createDesertDto);
  }

  @Get()
  findAll() {
    return this.desertService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.desertService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDesertDto: UpdateDesertDto) {
    return this.desertService.update(+id, updateDesertDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.desertService.remove(+id);
  }
}
