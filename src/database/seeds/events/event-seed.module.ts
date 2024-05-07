import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Event } from 'src/event/entities/event.entity';
import { EventSeedService } from './event-seed.service';
import { Speaker } from 'src/speaker/entities/speaker.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Event, Speaker])],
  providers: [EventSeedService],
  exports: [EventSeedService],
})
export class EventSeedModule {}
