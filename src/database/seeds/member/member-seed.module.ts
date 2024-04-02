import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Member } from 'src/member/entities/member.entity';
import { MemberSeedService } from './member-seed.service';
import { Image } from 'src/image/entities/image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Member, Image])],
  providers: [MemberSeedService],
  exports: [MemberSeedService],
})
export class MemberSeedModule {}
