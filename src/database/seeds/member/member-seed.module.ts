import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Member } from 'src/member/entities/member.entity';
import { MemberSeedService } from './member-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([Member])],
  providers: [MemberSeedService],
  exports: [MemberSeedService],
})
export class MemberSeedModule {}
