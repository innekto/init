import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Service } from 'src/services/entities/service.entity';
import { servicesData } from 'src/database/service/data-creation/services';
import { Category } from 'src/categories/entities/category.entity';

@Injectable()
export class ServiceSeedService {
  constructor(
    @InjectRepository(Service)
    private serviceRepository: Repository<Service>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async run() {
    const categoryCount = await this.categoryRepository.count();
    const count = await this.serviceRepository.count();
    if (categoryCount !== 0 && count === 0) {
      await Promise.all(
        servicesData.map(async (item) => {
          const { categoryName, ...rest } = item;

          const category = await this.categoryRepository.findOneOrFail({
            where: { name: categoryName },
          });

          const newService = new Service(rest);
          newService.category = category;
          await this.serviceRepository.save(newService);
        }),
      );
    }
  }
}
