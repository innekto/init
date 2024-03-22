import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Speaker } from 'src/speaker/entities/speaker.entity';
import { In, Repository } from 'typeorm';
import { Event } from 'src/event/entities/event.entity';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Speaker)
    private speakerRepository: Repository<Speaker>,
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
  ) {}

  async create(payload: CreateEventDto) {
    const newEvent = new Event(payload);

    const { speakersIds = [] } = payload;

    if (speakersIds.length) {
      const speakers = await this.speakerRepository.find({
        where: { id: In(speakersIds) },
      });

      newEvent.speakers = speakers;
    } else {
      newEvent.speakers = [];
    }

    return await this.eventRepository.save(newEvent);
  }

  findAll() {
    return `This action returns all event`;
  }

  findOne(id: number) {
    return `This action returns a #${id} event`;
  }

  update(id: number, updateEventDto: UpdateEventDto) {
    return `This action updates a #${id} event`;
  }

  remove(id: number) {
    return `This action removes a #${id} event`;
  }
}
