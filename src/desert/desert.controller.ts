import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  UploadedFile,
} from '@nestjs/common';
import { DesertService } from './desert.service';
import { CreateDesertDto } from './dto/create-desert.dto';
import { UpdateDesertDto } from './dto/update-desert.dto';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { ReplaceDesertImageDto } from './dto/replace-desert-image-dto';

@ApiTags('deserts')
@Controller('desert')
export class DesertController {
  constructor(
    private readonly desertService: DesertService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('imagePath'))
  create(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }),
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Body() createDesertDto: CreateDesertDto,
  ) {
    return this.desertService.create(createDesertDto, file);
  }

  @Delete('desetr-image/delete/:id')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('imagePath'))
  async deleteDesertImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }),
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Body() replaceImage: ReplaceDesertImageDto,
    @Param('id') id: number,
  ) {
    return await this.desertService.replaceDesertImage(id, file);
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
