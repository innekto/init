import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SocialSeedService } from './social-seed.service';
import { Social } from 'src/social/entities/social.entity';
import { Member } from 'src/member/entities/member.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Social, Member])],
  providers: [SocialSeedService],
  exports: [SocialSeedService],
})
export class SocialSeedModule {}
