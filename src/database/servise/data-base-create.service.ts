import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Desert } from 'src/desert/entities/desert.entity';
import { Repository } from 'typeorm';
import { desertData } from '../content/deserts';
import { DesertTypeEntity } from 'src/desert/entities/desert-type.entity';
import { desertTypes } from '../content/types/desert-types';
import { User } from 'src/users/user.entity';

import * as argon2 from 'argon2';
import { DesertFillingEntity } from 'src/desert/entities/filling.entity';
import { desertFillingData } from '../content/desrt-fillings';
import { desertFillingType } from 'src/common/types/desertFillingType';

@Injectable()
export class DataBaseCreateService {
  constructor(
    @InjectRepository(Desert)
    private desertRepository: Repository<Desert>,
    @InjectRepository(DesertTypeEntity)
    private desertTypesRepository: Repository<DesertTypeEntity>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(DesertFillingEntity)
    private desertFillingRepository: Repository<DesertFillingEntity>,
  ) { }

  async desertRepositoryInit() {
    if ((await this.desertRepository.count()) === 0) {
      for (const desert of desertData) {
        await this.desertRepository.save(Object.assign(new Desert(), desert));
      }
    }
  }
  async desertFillingRepositoryInit() {
    if ((await this.desertFillingRepository.count()) === 0) {
      for (const desert of desertFillingData) {
        await this.desertFillingRepository.save(
          Object.assign(new Desert(), desert),
        );
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

  async usersCreation() {
    const users = await this.userRepository.findOneBy({ role: 'user' });

    if (!users) {
      const user_one = new User();

      user_one.email = 'Sifag@gmail.com';
      user_one.role = 'user';
      user_one.password = await argon2.hash('password');
      user_one.name = 'Joe Sifag';
      user_one.isConfirm = true;

      await this.userRepository.save(user_one);

      const user_two = new User();

      user_two.email = 'Orisdawn@gmail.com';
      user_two.role = 'user';
      user_two.password = await argon2.hash('password');
      user_two.name = 'Lisa Migano';
      user_two.isConfirm = true;
    
      await this.userRepository.save(user_two);


    }
    
  }

  async desertsFillingCreation() {
    const cakes = await this.desertRepository.find({
      where: { type: 'cakes' },
      relations: ['desertFilling'],
    });

    const cakesWithMultiFillings = cakes.filter(
      (cake) => cake.composition === 'начинка на ваш вибір',
    );

    if (cakes && cakes[0].desertFilling.length === 0) {
      const fillingTypesArray = desertFillingType.slice(0, 6);

      for (const cake of cakesWithMultiFillings) {
        const fillingsToAdd = await this.desertFillingRepository
          .createQueryBuilder('fillings')
          .select()
          .where('fillings.name IN (:...types)', { types: fillingTypesArray })
          .getMany();

        cake.desertFilling.push(...fillingsToAdd);
      }

      const chocolateBlueberry = cakes.find(
        (cake) => cake.name === 'Шоколадно-чорничний торт',
      );

      const chocolateBlueberryFilling =
        await this.desertFillingRepository.findOne({
          where: { name: desertFillingType[6] },
        });

      chocolateBlueberry.desertFilling.push(chocolateBlueberryFilling);

      const cherryGrang = cakes.find(
        (cake) => cake.name === 'Торт "Черрі Гранд"',
      );

      const cherryFilling = await this.desertFillingRepository.findOne({
        where: { name: desertFillingType[7] },
      });

      cherryGrang.desertFilling.push(cherryFilling);

      const strawberryRaspberry = cakes.find(
        (cake) => cake.name === 'Полунично-малиновий торт',
      );

      const strawberryRaspberryFilling =
        await this.desertFillingRepository.findOne({
          where: { name: desertFillingType[8] },
        });

      strawberryRaspberry.desertFilling.push(strawberryRaspberryFilling);
    }
    await this.desertRepository.save(cakes);
  }
}
