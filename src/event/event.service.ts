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
    const { speakersIds = [] } = payload;
    const newEvent = new Event(payload);

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

  async findAll(): Promise<Event[]> {
    const events = await this.eventRepository.find({
      relations: ['speakers'],
      select: ['id', 'name', 'date', 'location'],
    });

    return events;
  }

  async findOne(eventId: number) {
    const event = await this.eventRepository.findOneOrFail({
      where: { id: eventId },
      relations: ['speakers'],
    });
    return event;
  }

  async update(id: number, updateEventDto: UpdateEventDto) {
    return `This action updates a #${id} event`;
  }

  async remove(id: number) {
    const event = await this.eventRepository.findOneByOrFail({ id });
    return await this.eventRepository.delete(event.id);
  }
}
