import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { WhatIsDoneSeedModule } from './what-is-done/what-is-done-seed.module';
import { dataSourceOptionst } from '../database-config';
import { CategorySeedModule } from './category/category-seed.module';
import { AdminSeedModule } from './admin/admin-seed.module';
import { WhoWeAreSeedModule } from './who-we-are/who-we-are-seed.module';
import { ServiceSeedModule } from './service/service-seed.module';
import { MemberSeedModule } from './member/member-seed.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...dataSourceOptionst,
    }),
    WhatIsDoneSeedModule,
    CategorySeedModule,
    AdminSeedModule,
    WhoWeAreSeedModule,
    ServiceSeedModule,
    MemberSeedModule,
  ],
})
export class SeedModule {}
