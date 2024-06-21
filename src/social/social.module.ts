import { Module } from '@nestjs/common';
import { SocialService } from './social.service';
import { SocialController } from './social.controller';
import { Member } from 'src/member/entities/member.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Social } from './entities/social.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Social, Member])],
  controllers: [SocialController],
  providers: [SocialService],
})
export class SocialModule {}
