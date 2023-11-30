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
  UseGuards,
} from '@nestjs/common';
import { DesertService } from './desert.service';
import { CreateDesertDto } from './dto/create-desert.dto';
import { UpdateDesertDto } from './dto/update-desert.dto';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { AdminAuthGuard } from 'src/auth/guards/admin.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('desert')
@Controller('desert')
export class DesertController {
  constructor(
    private readonly desertService: DesertService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Get()
  async findAll() {
    return this.desertService.findAll();
  }

  @Get('deserts-of-type/:type')
  async findDesertsOfType(@Param('type') type: string) {
    return this.desertService.findDesertsOfType(type);
  }

  @Get('types')
  async getTypes() {
    return this.desertService.getTypesOfDeserts();
  }

  @Get('filings')
  async getFilings() {
    return this.desertService.getFilings();
  }

  @ApiBearerAuth()
  @Post()
  @UseGuards(AdminAuthGuard)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('imagePath'))
  async create(
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

  @ApiBearerAuth()
  @Patch(':id')
  @UseGuards(AdminAuthGuard)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('imagePath'))
  async deleteDesertImage(
    @UploadedFile() file: Express.Multer.File,

    @Body() updateDesertDto: UpdateDesertDto,
    @Param('id') id: number,
  ) {
    console.log('id', id);
    return await this.desertService.updateDesert(id, file, updateDesertDto);
  }

  @ApiBearerAuth()
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string) {
    return this.desertService.findOne(+id);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @UseGuards(AdminAuthGuard)
  async remove(@Param('id') id: string) {
    return this.desertService.remove(+id);
  }
}
