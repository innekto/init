import { Injectable } from '@nestjs/common';
import { CreateSpeakerDto } from './dto/create-speaker.dto';
import { UpdateSpeakerDto } from './dto/update-speaker.dto';
import { Speaker } from './entities/speaker.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from 'src/event/entities/event.entity';
import { ImageService } from 'src/image/image.service';
import { checkImageFields } from 'src/image/helpers/check.image.fields';

@Injectable()
export class SpeakerService {
  constructor(
    @InjectRepository(Speaker)
    private speakerRepository: Repository<Speaker>,
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
    private readonly imageServise: ImageService,
  ) {}

  async getAll() {
    return await this.speakerRepository.find();
  }

  async create(payload: CreateSpeakerDto) {
    const newSpeaker = new Speaker(payload);
    const image = await this.imageServise.findOneById(payload.imageId);
    checkImageFields(image);
    newSpeaker.image = image;
    return await this.speakerRepository.save(newSpeaker);
  }

  async update(id: number, payload: UpdateSpeakerDto) {
    const speaker = await this.speakerRepository.findOneByOrFail({ id });

    if (payload.imageId) {
      const removedImageId = speaker.image.id;
      speaker.image = null;

      await this.speakerRepository.save(speaker);
      await this.imageServise.remove(removedImageId);

      const newImage = await this.imageServise.findOneById(payload.imageId);
      speaker.image = newImage;
    }

    Object.assign(speaker, payload);
    const updatedSpeaker = await this.speakerRepository.save(speaker);

    return updatedSpeaker;
  }

  async remove(id: number) {
    const speaker = await this.speakerRepository.findOneOrFail({
      where: { id },
      relations: ['image'],
    });
    await this.speakerRepository.remove(speaker);
    await this.imageServise.remove(speaker.image.id);
  }
}
