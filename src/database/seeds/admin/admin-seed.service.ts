import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from 'src/admin/entities/admin.entity';
import { Role } from 'src/common/emuns/role.emun';
import * as bcrypt from 'bcrypt';

import { Repository } from 'typeorm';

@Injectable()
export class AdminSeedService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
  ) {}

  async run() {
    const isAdmin = await this.adminRepository.exist({
      where: { role: Role.Admin },
    });

    if (!isAdmin) {
      const adminUser = new Admin();

      adminUser.email = 'tuppefreupaummau-2893@yopmail.com';
      adminUser.role = Role.Admin;
      adminUser.password = await bcrypt.hash('Browserus!9874538', 10);
      adminUser.name = 'admin admin';
      adminUser.emailVerified = true;
      await this.adminRepository.save(adminUser);
    }
  }
}
