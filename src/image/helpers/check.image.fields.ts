import { ConflictException } from '@nestjs/common';
import { Image } from '../entities/image.entity';
import { relations } from './relation.helper';

export const checkImageFields = (image: Image): void => {
  const fields = relations;
  for (const field of fields) {
    if (image[field] !== null) {
      throw new ConflictException(`This image si already attached `);
    }
  }
};
