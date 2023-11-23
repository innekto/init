import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Desert } from 'src/desert/entities/desert.entity';
import { Repository } from 'typeorm';
import { desertData } from '../content/deserts';
import { DesertTypeEntity } from 'src/desert/entities/desert-type.entity';
import { desertTypes } from '../content/desert-types';

@Injectable()
export class DataBaseCreateService {
  constructor(
    @InjectRepository(Desert)
    private desertRepository: Repository<Desert>,
    @InjectRepository(DesertTypeEntity)
    private desertTypesRepository: Repository<DesertTypeEntity>,
  ) {}

  async desertRepositoryInit() {
    if ((await this.desertRepository.count()) === 0) {
      for (const desert of desertData) {
        await this.desertRepository.save(Object.assign(new Desert(), desert));
      }
    }
  }

  async desertTypesRepositoryInit() {
    if ((await this.desertTypesRepository.count()) === 0) {
      for (const type of desertTypes) {
        await this.desertTypesRepository.save(
          Object.assign(new DesertTypeEntity(), type),
        );
      }
    }
  }
}
