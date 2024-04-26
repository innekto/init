import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/categories/entities/category.entity';

import { CategorySeedService } from './category-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  providers: [CategorySeedService],
  exports: [CategorySeedService],
})
export class CategorySeedModule {}
