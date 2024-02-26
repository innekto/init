import { Injectable } from '@nestjs/common';
import { CreateWhatIsDoneDto } from './dto/create-what-is-done.dto';
import { UpdateWhatIsDoneDto } from './dto/update-what-is-done.dto';
import { WhatIsDone } from './entities/what-is-done.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { Category } from 'src/categories/entities/category.entity';

@Injectable()
export class WhatIsDoneService {
  constructor(
    @InjectRepository(WhatIsDone)
    private whatIsDoneRepository: Repository<WhatIsDone>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    private cloudinaryService: CloudinaryService,
  ) {}

  async create(file: Express.Multer.File, payload: CreateWhatIsDoneDto) {
    const { categoryName, ...rest } = payload;

    const newResource = new WhatIsDone(rest);

    const category = await this.categoryRepository.findOneOrFail({
      where: { name: categoryName },
    });
    newResource.category = category;

    const upload = await this.cloudinaryService.uploadFile(file);

    newResource.imagePath = upload.secure_url;

    return await this.whatIsDoneRepository.save(newResource);
  }

  findAll() {
    return `This action returns all whatIsDone`;
  }

  findOne(id: number) {
    return `This action returns a #${id} whatIsDone`;
  }

  update(id: number, updateWhatIsDoneDto: UpdateWhatIsDoneDto) {
    return `This action updates a #${id} whatIsDone`;
  }

  remove(id: number) {
    return `This action removes a #${id} whatIsDone`;
  }
}
