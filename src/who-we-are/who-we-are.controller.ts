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
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { AdminAuthGuard } from 'src/auth/guards/admin.guard';

@Controller('who-we-are')
@ApiTags('who-we-are')
export class WhoWeAreController {
  constructor(private readonly whoWeAreService: WhoWeAreService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AdminAuthGuard)
  @ApiOperation({ summary: 'post new us by admin' })
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
  async getAll() {
    return this.whoWeAreService.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.whoWeAreService.findOne(+id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(AdminAuthGuard)
  @ApiOperation({ summary: 'update us by admin' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('imagePath'))
  update(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: number,
    @Body() payload: UpdateWhoWeAreDto,
  ) {
    return this.whoWeAreService.update(file, id, payload);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.whoWeAreService.remove(+id);
  }
}
