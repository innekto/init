import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { WhoWeAre } from 'src/who-we-are/entities/who-we-are.entity';
import { WhoWeAreData } from 'src/database/service/data-creation/who-we-are';

@Injectable()
export class WhoWeAreSeedService {
  constructor(
    @InjectRepository(WhoWeAre)
    private whoWeAreRepository: Repository<WhoWeAre>,
  ) {}

  async run() {
    const whoWeAreCount = await this.whoWeAreRepository.count();
    if (whoWeAreCount === 0) {
      await Promise.all(
        WhoWeAreData.map(async (item) => {
          const { imagePath, ...rest } = item;

          const newWe = new WhoWeAre(rest);

          newWe.imagePath = imagePath;

          await this.whoWeAreRepository.save(newWe);
        }),
      );
    }
  }
}
