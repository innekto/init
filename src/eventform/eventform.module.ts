import { Module } from '@nestjs/common';
import { EventformService } from './eventform.service';
import { EventformController } from './eventform.controller';
import { EventForm } from './entities/eventform.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Event } from 'src/event/entities/event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EventForm, Event])],
  controllers: [EventformController],
  providers: [EventformService, ConfigService],
})
export class EventformModule {}
