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
  HttpStatus,
} from '@nestjs/common';
import { DesertService } from './desert.service';
import { CreateDesertDto } from './dto/create-desert.dto';
import { UpdateDesertDto } from './dto/update-desert.dto';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { AdminAuthGuard } from 'src/auth/guards/admin.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Desert } from './entities/desert.entity';
import { User } from 'src/common/decorators/user.decorator';

@ApiTags('desert')
@Controller('desert')
export class DesertController {
  constructor(
    private readonly desertService: DesertService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @ApiOperation({ summary: 'Get all deserts' })
  @Get()
  async getAllDeserts() {
    return this.desertService.getAllDeserts();
  }

  @ApiOperation({ summary: 'Get all deserts of one type' })
  @ApiResponse({
    status: HttpStatus.OK,
    content: {
      'application/json': {
        example: [
          {
            id: 1,
            type: 'macaroon',
            name: 'Набір макарунів',
            price: 480,
            imagePath: 'https://...',
            weight: 180,
            composition: 'Набір макарунів',
            createdAt: '2023-12-19T15:30:29.542Z',
            updatedAt: '2023-12-19T15:30:29.542Z',
            deletedAt: null,
          },
        ],
      },
    },
  })
  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard)
  @Get('deserts-of-type/:type')
  async findDesertsOfType(@Param('type') type: string) {
    return this.desertService.findDesertsOfType(type);
  }

  @ApiOperation({ summary: 'Only for rendering' })
  @Get('types')
  async getTypes() {
    return this.desertService.getTypesOfDeserts();
  }

  // @ApiOperation({ summary: 'Only for rendering' })
  // @Get('filings')
  // async getFilings() {
  //   return this.desertService.getFilings();
  // }

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
    return await this.desertService.updateDesert(id, file, updateDesertDto);
  }

  @ApiOperation({ summary: 'Get one desert by ID' })
  // @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    content: {
      'application/json': {
        example: {
          id: 10,
          type: 'tarts',
          name: 'Еклер',
          price: 70,
          imagePath: 'https://.......',
          weight: 55,
          composition: 'Шоколадний еклер',
          createdAt: 'Date',
          updatedAt: 'Date',
          deletedAt: null,
        },
      },
    },
  })
  @Get(':id')
  // @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string): Promise<Desert> {
    return this.desertService.findOne(+id);
  }

  @ApiOperation({ summary: 'Delete desert by admin' })
  @ApiBearerAuth()
  @Delete(':id')
  @UseGuards(AdminAuthGuard)
  async remove(@Param('id') id: number) {
    return this.desertService.remove(id);
  }

  @ApiOperation({ summary: 'add/remove desert to/from favorite' })
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    content: {
      'application/json': {
        example: {
          user: {
            id: 1,
            favoriteDesserts: [
              { id: 2, name: 'name' },
              { id: 3, name: 'name' },
            ],
          },
        },
      },
    },
  })
  @UseGuards(JwtAuthGuard)
  @Post('toggleDesertFavorite/:desertId')
  async toggleDesertFavorite(
    @User('id') userId: number,
    @Param('desertId') desertId: number,
  ) {
    return this.desertService.toggleDesertFavorite(userId, desertId);
  }
}
