import { Injectable } from '@nestjs/common';
import { CreateDesertDto } from './dto/create-desert.dto';
import { UpdateDesertDto } from './dto/update-desert.dto';
import { Desert } from './entities/desert.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DesertService {
  constructor(
    @InjectRepository(Desert) private desertRepository: Repository<Desert>,
  ) {}
  create(createDesertDto: CreateDesertDto) {
    return 'This action adds a new desert';
  }

  async findAll() {
    return await this.desertRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} desert`;
  }

  update(id: number, updateDesertDto: UpdateDesertDto) {
    return `This action updates a #${id} desert`;
  }

  remove(id: number) {
    return `This action removes a #${id} desert`;
  }
}
