import { Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Service } from './entities/service.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from 'src/categories/entities/category.entity';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private serviceRepository: Repository<Service>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(payload: CreateServiceDto) {
    const { categoryName, ...rest } = payload;

    const category = await this.categoryRepository.findOneByOrFail({
      name: categoryName,
    });

    const newService = new Service(rest);
    newService.category = category;
    return await this.serviceRepository.save(newService);
  }

  async update(id: number, payload: UpdateServiceDto) {
    const service = await this.serviceRepository.findOneByOrFail({ id });

    Object.assign(service, payload);
    const updatedService = await this.serviceRepository.save(service);
    return updatedService;
  }

  async findAll() {
    return await this.serviceRepository.find();
  }

  async remove(id: number) {
    return await this.serviceRepository.delete(id);
  }
}
