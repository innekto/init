import { Injectable } from '@nestjs/common';
import { CreateWhoWeAreDto } from './dto/create-who-we-are.dto';
import { UpdateWhoWeAreDto } from './dto/update-who-we-are.dto';
import { WhoWeAre } from './entities/who-we-are.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { whoWeAreGrouping } from './utils/grouping.for.render';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { publicIdExtract } from 'src/common/helpers/public-id.extraction';

@Injectable()
export class WhoWeAreService {
  constructor(
    @InjectRepository(WhoWeAre)
    private whoWeAreRepository: Repository<WhoWeAre>,
    private cloudinaryService: CloudinaryService,
  ) {}

  async create(payload: CreateWhoWeAreDto, image: Express.Multer.File) {
    const newWe = new WhoWeAre(payload);
    const { secure_url } = await this.cloudinaryService.uploadFile(image);

    newWe.imagePath = secure_url;

    return await this.whoWeAreRepository.save(newWe);
  }

  async getAll() {
    const result = await this.whoWeAreRepository.find();
    return whoWeAreGrouping(result);
  }

  async update(
    id: number,
    payload: UpdateWhoWeAreDto,
    image: Express.Multer.File,
  ) {
    const us = await this.whoWeAreRepository.findOneOrFail({
      where: { id },
    });

    if (image) {
      const publicId = publicIdExtract(us.imagePath);
      await this.cloudinaryService.deleteFile(publicId);
      const { secure_url } = await this.cloudinaryService.uploadFile(image);
      us.imagePath = secure_url;
    }

    Object.assign(us, payload);

    const updatedUs = await this.whoWeAreRepository.save(us);
    return updatedUs;
  }

  async remove(id: number) {
    return await this.whoWeAreRepository.delete(id);
  }
}
