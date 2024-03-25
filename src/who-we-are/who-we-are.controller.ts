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
import { WhoWeAreService } from './who-we-are.service';
import { CreateWhoWeAreDto } from './dto/create-who-we-are.dto';
import { UpdateWhoWeAreDto } from './dto/update-who-we-are.dto';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
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
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('imagePath'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createWhoWeAreDto: CreateWhoWeAreDto,
  ) {
    return this.whoWeAreService.create(file, createWhoWeAreDto);
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
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('imagePath'))
  async update(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: number,
    @Body() payload: UpdateWhoWeAreDto,
  ) {
    return this.whoWeAreService.update(file, id, payload);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AdminAuthGuard)
  @ApiOperation({ summary: 'delete us by admin' })
  async remove(@Param('id') id: number) {
    return this.whoWeAreService.remove(id);
  }
}
