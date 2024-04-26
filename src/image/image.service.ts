import { Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { Image } from './entities/image.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { Repository } from 'typeorm';
import { publicIdExtract } from 'src/common/helpers/public-id.extraction';
import { relations } from './helpers/relation.helper';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private imageRepository: Repository<Image>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(
    file: Express.Multer.File,
    payload: CreateImageDto,
  ): Promise<Image> {
    const upload = await this.cloudinaryService.uploadFile(file);

    const imagePath = upload.secure_url;

    const newImage = new Image({ ...payload });
    newImage.imagePath = imagePath;
    return await this.imageRepository.save(newImage);
  }

  async update(id: number, file: Express.Multer.File, payload: UpdateImageDto) {
    const image = await this.imageRepository.findOneByOrFail({ id });

    if (file) {
      const publicId = publicIdExtract(image.imagePath);
      await this.cloudinaryService.deleteFile(publicId);

      const upload = await this.cloudinaryService.uploadFile(file);
      const imagePath = upload.secure_url;
      image.imagePath = imagePath;
    }

    Object.assign(image, payload);

    const updatedImage = await this.imageRepository.save(image);
    return updatedImage;
  }

  async remove(id: number) {
    const image = await this.imageRepository.findOneByOrFail({ id });
    const publicId = publicIdExtract(image.imagePath);

    await this.cloudinaryService.deleteFile(publicId);
    await this.imageRepository.delete({ id });
  }

  async findOneById(id: number) {
    return await this.imageRepository.findOneOrFail({
      where: { id },
      relations: relations,
    });
  }
}
