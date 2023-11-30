import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Desert } from 'src/desert/entities/desert.entity';
import { Repository } from 'typeorm';
import { desertData } from '../content/deserts';
import { DesertTypeEntity } from 'src/desert/entities/desert-type.entity';
import { desertTypes } from '../content/desert-types';
import { User } from 'src/users/user.entity';

import * as argon2 from 'argon2';

@Injectable()
export class DataBaseCreateService {
  constructor(
    @InjectRepository(Desert)
    private desertRepository: Repository<Desert>,
    @InjectRepository(DesertTypeEntity)
    private desertTypesRepository: Repository<DesertTypeEntity>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
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

  async adminCreation() {
    const admin = await this.userRepository.findOneBy({ role: 'admin' });

    if (!admin) {
      const adminUser = new User();

      adminUser.email = 'admin@gmail.com';
      adminUser.role = 'admin';
      adminUser.password = await argon2.hash('password');
      adminUser.name = 'admin admin';
      adminUser.isConfirm = true;
      await this.userRepository.save(adminUser);
    }
  }
}
