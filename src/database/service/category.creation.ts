import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/categories/entities/category.entity';
import { Repository } from 'typeorm';
import { categoryData } from './data-creation/categories';

@Injectable()
export class CategoryCreationService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async categoryCreation() {
    const count = await this.categoryRepository.count();
    if (count === 0) {
      await Promise.all(
        categoryData.map(async (category) => {
          await this.categoryRepository.save(new Category(category));
        }),
      );
    }
  }
}
