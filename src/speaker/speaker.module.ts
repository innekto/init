import { Module } from '@nestjs/common';
import { SpeakerService } from './speaker.service';
import { SpeakerController } from './speaker.controller';
import { Speaker } from './entities/speaker.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from 'src/event/entities/event.entity';

import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Module({
  imports: [TypeOrmModule.forFeature([Speaker, Event])],
  controllers: [SpeakerController],
  providers: [SpeakerService, CloudinaryService],
})
export class SpeakerModule {}
