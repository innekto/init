import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Speaker } from 'src/speaker/entities/speaker.entity';

import {
  speakersData,
  speakersImages,
} from 'src/database/service/data-creation';

@Injectable()
export class SpeakerSeedService {
  constructor(
    @InjectRepository(Speaker)
    private speakerRepository: Repository<Speaker>,
  ) {}

  async run() {
    const count = await this.speakerRepository.count();
    if (!count) {
      await Promise.all(
        speakersData.map(async (item, index) => {
          const newSpeaker = new Speaker(item);

          newSpeaker.imagePath = speakersImages[index].imagePath;
          newSpeaker.imageAlt = speakersImages[index].description;

          await this.speakerRepository.save(newSpeaker);
        }),
      );
    }
  }
}
