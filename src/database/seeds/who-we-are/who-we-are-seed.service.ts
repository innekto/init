import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { WhoWeAre } from 'src/who-we-are/entities/who-we-are.entity';

import {
  WhoWeAreData,
  whoWeAreImages,
} from 'src/database/service/data-creation';

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
        WhoWeAreData.map(async (item, index) => {
          const newWhoWeAre = new WhoWeAre(item);

          newWhoWeAre.imagePath = whoWeAreImages[index].imagePath;
          newWhoWeAre.imageAlt = whoWeAreImages[index].description;

          await this.whoWeAreRepository.save(newWhoWeAre);
        }),
      );
    }
  }
}
