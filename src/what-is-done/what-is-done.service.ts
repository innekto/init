import { Injectable } from '@nestjs/common';
import { CreateWhatIsDoneDto } from './dto/create-what-is-done.dto';
import { UpdateWhatIsDoneDto } from './dto/update-what-is-done.dto';
import { WhatIsDone } from './entities/what-is-done.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from 'src/categories/entities/category.entity';
import { ImageService } from 'src/image/image.service';
import { checkImageFields } from 'src/image/helpers/check.image.fields';

@Injectable()
export class WhatIsDoneService {
  constructor(
    @InjectRepository(WhatIsDone)
    private whatIsDoneRepository: Repository<WhatIsDone>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    private readonly imageServise: ImageService,
  ) {}

  async create(payload: CreateWhatIsDoneDto): Promise<WhatIsDone> {
    const { categoryName, ...rest } = payload;

    const newResource = new WhatIsDone(rest);
    const image = await this.imageServise.findOneById(payload.imageId);
    checkImageFields(image);
    newResource.image = image;
    const category = await this.categoryRepository.findOneOrFail({
      where: { name: categoryName },
    });
    newResource.category = category;

    return await this.whatIsDoneRepository.save(newResource);
  }

  async update(id: number, payload: UpdateWhatIsDoneDto): Promise<WhatIsDone> {
    const cool = await this.whatIsDoneRepository.findOneOrFail({
      where: { id },
      relations: ['image'],
    });

    if (payload.imageId) {
      const removedImageId = cool.image.id;
      cool.image = null;

      await this.whatIsDoneRepository.save(cool);
      await this.imageServise.remove(removedImageId);

      const newImage = await this.imageServise.findOneById(payload.imageId);
      cool.image = newImage;
    }

    Object.assign(cool, payload);
    const updatedCool = await this.whatIsDoneRepository.save(cool);

    return updatedCool;
  }

  async findAllInCategory(category: string) {
    return await this.whatIsDoneRepository.findBy({
      category: { name: category },
    });
  }

  async remove(id: number) {
    const cool = await this.whatIsDoneRepository.findOneOrFail({
      where: { id },
      relations: ['image'],
    });

    await this.whatIsDoneRepository.remove(cool);
    await this.imageServise.remove(cool.image.id);
  }
}
