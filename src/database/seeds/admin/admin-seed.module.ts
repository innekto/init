import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Admin } from 'src/admin/entities/admin.entity';
import { AdminSeedService } from './admin-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([Admin])],
  providers: [AdminSeedService],
  exports: [AdminSeedService],
})
export class AdminSeedModule {}
