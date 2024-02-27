import { Injectable } from '@nestjs/common';
import { CreateWhoWeAreDto } from './dto/create-who-we-are.dto';
import { UpdateWhoWeAreDto } from './dto/update-who-we-are.dto';
import { WhoWeAre } from './entities/who-we-are.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { Repository } from 'typeorm';
import { publicIdExtract } from 'src/common/helpers/public-id.extraction';

@Injectable()
export class WhoWeAreService {
  constructor(
    @InjectRepository(WhoWeAre)
    private whoWeAreRepository: Repository<WhoWeAre>,

    private cloudinaryService: CloudinaryService,
  ) {}

  async create(file: Express.Multer.File, payload: CreateWhoWeAreDto) {
    const upload = await this.cloudinaryService.uploadFile(file);
    const newWe = new WhoWeAre({ ...payload, imagePath: upload.secure_url });
    return await this.whoWeAreRepository.save(newWe);
  }

  async getAll() {
    return await this.whoWeAreRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} whoWeAre`;
  }

  async update(
    file: Express.Multer.File,
    id: number,
    payload: UpdateWhoWeAreDto,
  ) {
    const us = await this.whoWeAreRepository.findOneOrFail({ where: { id } });

    if (file) {
      const publicId = publicIdExtract(us.imagePath);

      await this.cloudinaryService.deleteFile(publicId);

      const upload = await this.cloudinaryService.uploadFile(file);
      us.imagePath = upload.secure_url;
    }

    Object.assign(us, payload);

    const updatedUs = await this.whoWeAreRepository.save(us);
    return updatedUs;
  }

  remove(id: number) {
    return `This action removes a #${id} whoWeAre`;
  }
}
