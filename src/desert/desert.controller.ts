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
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
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

  @ApiOperation({ summary: 'Get all deserts' })
  @Get()
  async findAll() {
    return this.desertService.findAll();
  }

  @ApiOperation({ summary: 'Get all deserts of one type' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('deserts-of-type/:type')
  async findDesertsOfType(@Param('type') type: string) {
    return this.desertService.findDesertsOfType(type);
  }

  @ApiOperation({ summary: 'Only for rendering' })
  @Get('types')
  async getTypes() {
    return this.desertService.getTypesOfDeserts();
  }

  @ApiOperation({ summary: 'Only for rendering' })
  @Get('filings')
  async getFilings() {
    return this.desertService.getFilings();
  }

  @ApiOperation({ summary: 'Create new desert by admin' })
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

  @ApiOperation({ summary: 'Update desert by admin' })
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

  @ApiOperation({ summary: 'Get one desert by ID' })
  @ApiBearerAuth()
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string) {
    return this.desertService.findOne(+id);
  }

  @ApiOperation({ summary: 'Delete desert by admin' })
  @ApiBearerAuth()
  @Delete(':id')
  @UseGuards(AdminAuthGuard)
  async remove(@Param('id') id: string) {
    return this.desertService.remove(+id);
  }
}
