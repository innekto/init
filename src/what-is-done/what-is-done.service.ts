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

    const upload = await this.cloudinaryService.uploadFile(file);
    const newResource = new WhatIsDone({
      ...rest,
      imagePath: upload.secure_url,
    });

    const category = await this.categoryRepository.findOneOrFail({
      where: { name: categoryName },
    });
    newResource.category = category;

    return await this.whatIsDoneRepository.save(newResource);
  }

  async findAllInCategory(category: string) {
    return await this.whatIsDoneRepository.findBy({
      category: { name: category },
    });
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
