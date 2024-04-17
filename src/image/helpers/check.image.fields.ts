import { ConflictException } from '@nestjs/common';
import { Image } from '../entities/image.entity';

export const checkImageFields = (image: Image): void => {
  const fields = ['member', 'speaker', 'whatIsDone', 'whoWeAre'];
  for (const field of fields) {
    if (image[field] !== null) {
      throw new ConflictException(`This image si already attached `);
    }
  }
};
