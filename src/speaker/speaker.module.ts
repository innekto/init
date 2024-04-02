import { Module } from '@nestjs/common';
import { SpeakerService } from './speaker.service';
import { SpeakerController } from './speaker.controller';
import { Speaker } from './entities/speaker.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from 'src/event/entities/event.entity';
import { ImageService } from 'src/image/image.service';
import { Image } from 'src/image/entities/image.entity';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Module({
  imports: [TypeOrmModule.forFeature([Speaker, Event, Image])],
  controllers: [SpeakerController],
  providers: [SpeakerService, ImageService, CloudinaryService],
})
export class SpeakerModule {}
