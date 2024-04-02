import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Image } from '../../../image/entities/image.entity';
import {
  membersImages,
  whoWeAreImages,
} from 'src/database/service/data-creation/images';

@Injectable()
export class ImageSeedService {
  constructor(
    @InjectRepository(Image)
    private imageRepository: Repository<Image>,
  ) {}

  async run() {
    const count = await this.imageRepository.count();

    if (count === 0) {
      await Promise.all(
        membersImages.map(async (item) => {
          const { imagePath, ...rest } = item;
          const newMemberImage = new Image(rest);
          newMemberImage.imagePath = imagePath;
          await this.imageRepository.save(newMemberImage);
        }),
      );

      await Promise.all(
        whoWeAreImages.map(async (item) => {
          const { imagePath, ...rest } = item;
          const newWhoWeAreImage = new Image(rest);
          newWhoWeAreImage.imagePath = imagePath;
          await this.imageRepository.save(newWhoWeAreImage);
        }),
      );
    }
  }
}
