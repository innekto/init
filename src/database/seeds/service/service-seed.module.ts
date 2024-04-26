import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Service } from 'src/services/entities/service.entity';
import { ServiceSeedService } from './service-seed.service';
import { Category } from 'src/categories/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Service, Category])],
  providers: [ServiceSeedService],
  exports: [ServiceSeedService],
})
export class ServiceSeedModule {}
