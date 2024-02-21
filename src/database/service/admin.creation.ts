import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from 'src/admin/entities/admin.entity';
import { Role } from 'src/common/emuns/role.emun';
import * as bcrypt from 'bcrypt';

import { Repository } from 'typeorm';

@Injectable()
export class AdminCreationService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
  ) {}

  async adminCreation() {
    const isAdmin = await this.adminRepository.exist({
      where: { role: Role.Admin },
    });

    if (!isAdmin) {
      const adminUser = new Admin();

      adminUser.email = 'creative.misto@gmail.com';
      adminUser.role = Role.Admin;
      adminUser.password = await bcrypt.hash('Mistopass22', 10);
      adminUser.name = 'admin admin';
      adminUser.emailVerified = true;
      await this.adminRepository.save(adminUser);
    }
  }
}
