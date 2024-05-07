import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { Event } from 'src/event/entities/event.entity';
import { eventData } from 'src/database/service/data-creation/events';
import { Speaker } from 'src/speaker/entities/speaker.entity';
import { speakersData } from 'src/database/service/data-creation/speakers';

@Injectable()
export class EventSeedService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
    @InjectRepository(Speaker)
    private spekerRepository: Repository<Speaker>,
  ) {}

  async run() {
    const count = await this.eventRepository.count();
    const speakers = await this.spekerRepository.find();

    if (count === 0) {
      await Promise.all(
        eventData.map(async (item) => {
          const newEvent = new Event(item);

          switch (item.name) {
            case eventData[0].name:
              newEvent.speakers = [
                ...speakers.filter((s) => s.name === speakersData[0].name),
              ];
              break;

            case eventData[1].name:
              newEvent.speakers = [
                ...speakers.filter((s) => s.name === speakersData[1].name),
              ];
              break;

            case eventData[2].name:
              newEvent.speakers = [
                ...speakers.filter((s) => s.name === speakersData[2].name),
              ];
              break;

            case eventData[3].name:
              newEvent.speakers = [
                ...speakers.filter((s) => s.name === speakersData[3].name),
              ];
              break;

            case eventData[4].name:
              newEvent.speakers = [
                ...speakers.filter((s) => s.name === speakersData[4].name),
              ];
              break;

            case eventData[5].name:
              newEvent.speakers = [
                ...speakers.filter((s) => s.name === speakersData[5].name),
              ];
              break;

            default:
              newEvent.speakers = [];
              break;
          }

          await this.eventRepository.save(newEvent);
        }),
      );
    }
  }
}
