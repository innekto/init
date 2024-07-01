import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Speaker } from 'src/speaker/entities/speaker.entity';
import { SpeakerSeedService } from './speakers-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([Speaker])],
  providers: [SpeakerSeedService],
  exports: [SpeakerSeedService],
})
export class SpeakerSeedModule {}
