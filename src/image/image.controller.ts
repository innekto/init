import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ImageService } from './image.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiConsumes,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AdminAuthGuard } from 'src/auth/guards/admin.guard';
import { Image } from './entities/image.entity';

@ApiTags('images')
@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AdminAuthGuard)
  @ApiOperation({ summary: 'add image by admin' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ type: Image })
  @UseInterceptors(FileInterceptor('imagePath'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createImageDto: CreateImageDto,
  ): Promise<Image> {
    return this.imageService.create(file, createImageDto);
  }

  @Patch(':imageId')
  @ApiBearerAuth()
  @UseGuards(AdminAuthGuard)
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ type: Image })
  @UseInterceptors(FileInterceptor('imagePath'))
  update(
    @Param('imageId') id: number,
    @UploadedFile() file: Express.Multer.File,
    @Body() updateImageDto: UpdateImageDto,
  ) {
    return this.imageService.update(id, file, updateImageDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AdminAuthGuard)
  @ApiOperation({ summary: 'delete image by admin' })
  async remove(@Param('id') id: number) {
    return this.imageService.remove(id);
  }
}
