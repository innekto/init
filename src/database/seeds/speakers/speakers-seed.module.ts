import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Speaker } from 'src/speaker/entities/speaker.entity';
import { SpeakerSeedService } from './speakers-seed.service';
import { Image } from 'src/image/entities/image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Speaker, Image])],
  providers: [SpeakerSeedService],
  exports: [SpeakerSeedService],
})
export class SpeakerSeedModule {}
