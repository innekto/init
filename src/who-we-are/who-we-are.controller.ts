import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { WhoWeAreService } from './who-we-are.service';
import { CreateWhoWeAreDto } from './dto/create-who-we-are.dto';
import { UpdateWhoWeAreDto } from './dto/update-who-we-are.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { AdminAuthGuard } from 'src/auth/guards/admin.guard';
import { WhoWeAre } from './entities/who-we-are.entity';

@Controller('who-we-are')
@ApiTags('who-we-are')
export class WhoWeAreController {
  constructor(private readonly whoWeAreService: WhoWeAreService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AdminAuthGuard)
  @ApiOperation({ summary: 'post new us by admin' })
  @ApiResponse({ type: WhoWeAre })
  async create(@Body() createWhoWeAreDto: CreateWhoWeAreDto) {
    return this.whoWeAreService.create(createWhoWeAreDto);
  }

  @Get()
  @ApiOperation({ summary: 'get all us/only for rendering' })
  @ApiResponse({ type: [WhoWeAre] })
  async getAll() {
    return this.whoWeAreService.getAll();
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(AdminAuthGuard)
  @ApiOperation({ summary: 'update us by admin' })
  @ApiResponse({ type: WhoWeAre })
  async update(@Param('id') id: number, @Body() payload: UpdateWhoWeAreDto) {
    return this.whoWeAreService.update(id, payload);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AdminAuthGuard)
  @ApiOperation({ summary: 'delete us by admin' })
  async remove(@Param('id') id: number) {
    return this.whoWeAreService.remove(id);
  }
}
