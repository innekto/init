import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { Event } from './entities/event.entity';
import { Speaker } from 'src/speaker/entities/speaker.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Event, Speaker])],
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}
