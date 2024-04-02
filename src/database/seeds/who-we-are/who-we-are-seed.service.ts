import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { WhoWeAre } from 'src/who-we-are/entities/who-we-are.entity';
import { WhoWeAreData } from 'src/database/service/data-creation/who-we-are';
import { Image } from 'src/image/entities/image.entity';
import { whoWeAreImages } from 'src/database/service/data-creation/images';

@Injectable()
export class WhoWeAreSeedService {
  constructor(
    @InjectRepository(WhoWeAre)
    private whoWeAreRepository: Repository<WhoWeAre>,
    @InjectRepository(Image)
    private imageRepository: Repository<Image>,
  ) {}

  async run() {
    const whoWeAreCount = await this.whoWeAreRepository.count();
    if (whoWeAreCount === 0) {
      await Promise.all(
        WhoWeAreData.map(async (item) => {
          const newWe = new WhoWeAre(item);

          switch (item.title) {
            case WhoWeAreData[0].title:
              newWe.image = await this.imageRepository.findOneByOrFail({
                description: whoWeAreImages[0].description,
              });
              break;

            case WhoWeAreData[1].title:
              newWe.image = await this.imageRepository.findOneByOrFail({
                description: whoWeAreImages[1].description,
              });
              break;

            case WhoWeAreData[2].title:
              newWe.image = await this.imageRepository.findOneByOrFail({
                description: whoWeAreImages[2].description,
              });
              break;

            case WhoWeAreData[3].title:
              newWe.image = await this.imageRepository.findOneByOrFail({
                description: whoWeAreImages[3].description,
              });
              break;

            default:
              newWe.image = null;
              break;
          }

          await this.whoWeAreRepository.save(newWe);
        }),
      );
    }
  }
}
