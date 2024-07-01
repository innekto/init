import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  UploadedFile,
  UseInterceptors,
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

import { AdminAuthGuard } from 'src/auth/guards/admin.guard';
import { WhoWeAre } from './entities/who-we-are.entity';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('who-we-are')
@ApiTags('who-we-are')
export class WhoWeAreController {
  constructor(private readonly whoWeAreService: WhoWeAreService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AdminAuthGuard)
  @ApiOperation({ summary: 'post new us by admin' })
  @ApiResponse({ type: WhoWeAre })
  @UseInterceptors(FileInterceptor('imagePath'))
  @ApiConsumes('multipart/form-data')
  async create(
    @Body() createWhoWeAreDto: CreateWhoWeAreDto,
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
    return this.whoWeAreService.create(createWhoWeAreDto, image);
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
  @UseInterceptors(FileInterceptor('imagePath'))
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ type: WhoWeAre })
  async update(
    @Param('id') id: number,
    @Body() payload: UpdateWhoWeAreDto,
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
    return this.whoWeAreService.update(id, payload, image);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AdminAuthGuard)
  @ApiOperation({ summary: 'delete us by admin' })
  async remove(@Param('id') id: number) {
    return this.whoWeAreService.remove(id);
  }
}
