import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Category } from 'src/categories/entities/category.entity';
import { categoryData } from 'src/database/service/data-creation';

@Injectable()
export class CategorySeedService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async run() {
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
