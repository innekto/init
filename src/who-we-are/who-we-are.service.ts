import { Injectable } from '@nestjs/common';
import { CreateWhoWeAreDto } from './dto/create-who-we-are.dto';
import { UpdateWhoWeAreDto } from './dto/update-who-we-are.dto';
import { WhoWeAre } from './entities/who-we-are.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ImageService } from 'src/image/image.service';
import { checkImageFields } from 'src/image/helpers/check.image.fields';

@Injectable()
export class WhoWeAreService {
  constructor(
    @InjectRepository(WhoWeAre)
    private whoWeAreRepository: Repository<WhoWeAre>,
    private readonly imageServise: ImageService,
  ) {}

  async create(payload: CreateWhoWeAreDto) {
    const newWe = new WhoWeAre(payload);
    const image = await this.imageServise.findOneById(payload.imageId);
    checkImageFields(image);
    newWe.image = image;
    return await this.whoWeAreRepository.save(newWe);
  }

  async getAll() {
    return await this.whoWeAreRepository.find();
  }

  async update(id: number, payload: UpdateWhoWeAreDto) {
    const us = await this.whoWeAreRepository.findOneOrFail({
      where: { id },
      relations: ['image'],
    });

    if (payload.imageId) {
      const removedImageId = us.image.id;
      us.image = null;

      await this.whoWeAreRepository.save(us);
      await this.imageServise.remove(removedImageId);

      const newImage = await this.imageServise.findOneById(payload.imageId);
      us.image = newImage;
    }

    Object.assign(us, payload);

    const updatedUs = await this.whoWeAreRepository.save(us);
    return updatedUs;
  }

  async remove(id: number) {
    return await this.whoWeAreRepository.delete(id);
  }
}
