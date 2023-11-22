import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Desert } from 'src/desert/entities/desert.entity';
import { Repository } from 'typeorm';
import { desertData } from '../content/deserts';

@Injectable()
export class DataBaseCreateService {
  constructor(
    @InjectRepository(Desert)
    private desertRepository: Repository<Desert>,
  ) {}

  async desertRepositoryInit() {
    if ((await this.desertRepository.count()) === 0) {
      for (const desert of desertData) {
        await this.desertRepository.save(Object.assign(new Desert(), desert));
      }
    }
  }
}
