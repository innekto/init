import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Category } from 'src/categories/entities/category.entity';

import { WhatIsDone } from 'src/what-is-done/entities/what-is-done.entity';
import { whatIsDoneOnDigit } from 'src/database/service/data-creation';

@Injectable()
export class WhatIsDoneSeedService {
  constructor(
    @InjectRepository(WhatIsDone)
    private whatIsDoneRepository: Repository<WhatIsDone>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async run() {
    const categoryCount = await this.categoryRepository.count();
    const count = await this.whatIsDoneRepository.count();

    if (categoryCount !== 0 && count === 0) {
      await Promise.all(
        whatIsDoneOnDigit.map(async (item) => {
          const { categoryName, ...rest } = item;
          const newDigitItem = new WhatIsDone();

          const category = await this.categoryRepository.findOneOrFail({
            where: { name: categoryName },
          });

          newDigitItem.category = category;
          newDigitItem.challenge = rest.challenge;
          newDigitItem.client = rest.client;
          newDigitItem.collaborate = rest.collaboration;
          newDigitItem.title = rest.title;

          await this.whatIsDoneRepository.save(newDigitItem);
        }),
      );
    }
  }
}
