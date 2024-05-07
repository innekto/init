import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Speaker } from 'src/speaker/entities/speaker.entity';
import { speakersData } from 'src/database/service/data-creation/speakers';
import { Member } from 'src/member/entities/member.entity';
import { Image } from 'src/image/entities/image.entity';

@Injectable()
export class SpeakerSeedService {
  constructor(
    @InjectRepository(Speaker)
    private speakerRepository: Repository<Speaker>,
    @InjectRepository(Image)
    private imageRepository: Repository<Image>,
  ) {}

  async run() {
    const count = await this.speakerRepository.count();
    if (!count) {
      await Promise.all(
        speakersData.map(async (item) => {
          const newSpeaker = new Member(item);
          newSpeaker.image = await this.imageRepository.findOneOrFail({
            where: { description: item.name },
          });
          await this.speakerRepository.save(newSpeaker);
        }),
      );
    }
  }
}
