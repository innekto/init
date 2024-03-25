import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';

import { AdminService } from 'src/admin/admin.service';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    private readonly adminServise: AdminService,
  ) {}

  async create(payload: CreateCategoryDto) {
    const newCategory = new Category(payload);
    return await this.categoryRepository.save(newCategory);
  }

  async findAll() {
    return await this.categoryRepository.find();
  }

  async remove(id: number) {
    return await this.categoryRepository.delete(id);
  }
}
