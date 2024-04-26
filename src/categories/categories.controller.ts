import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AdminAuthGuard } from 'src/auth/guards/admin.guard';
import { Category } from './entities/category.entity';

@ApiTags('categories')
@Controller('category')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @ApiOperation({ summary: 'create new category by admin' })
  @ApiResponse({ type: Category })
  @ApiBearerAuth()
  @UseGuards(AdminAuthGuard)
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  @ApiOperation({ summary: 'get all categories/only for render' })
  async findAll() {
    return this.categoriesService.findAll();
  }

  @Delete(':id')
  @ApiOperation({ summary: 'delete category by admin' })
  @ApiBearerAuth()
  @UseGuards(AdminAuthGuard)
  async remove(@Param('id') id: number) {
    return this.categoriesService.remove(id);
  }
}
