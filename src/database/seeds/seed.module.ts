import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptionst } from '../database-config';
import { CategorySeedModule } from './category/category-seed.module';
import { AdminSeedModule } from './admin/admin-seed.module';
import { WhoWeAreSeedModule } from './who-we-are/who-we-are-seed.module';
import { ServiceSeedModule } from './service/service-seed.module';
import { MemberSeedModule } from './member/member-seed.module';

import { SpeakerSeedModule } from './speakers/speakers-seed.module';
import { EventSeedModule } from './events/event-seed.module';
import { SocialSeedModule } from './social/social-seed.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...dataSourceOptionst,
    }),

    CategorySeedModule,
    AdminSeedModule,
    WhoWeAreSeedModule,
    ServiceSeedModule,
    MemberSeedModule,

    SpeakerSeedModule,
    EventSeedModule,
    SocialSeedModule,
  ],
})
export class SeedModule {}
