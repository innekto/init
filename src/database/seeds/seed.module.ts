import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { WhatIsDoneSeedModule } from './what-is-done/what-is-done-seed.module';
import { dataSourceOptionst } from '../database-config';
import { CategorySeedModule } from './category/category-seed.module';
import { AdminSeedModule } from './admin/admin-seed.module';

@Module({
  imports: [
    WhatIsDoneSeedModule,
    CategorySeedModule,
    AdminSeedModule,
    TypeOrmModule.forRoot({
      ...dataSourceOptionst,
    }),
  ],
})
export class SeedModule {}
