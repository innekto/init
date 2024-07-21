import { Injectable } from '@nestjs/common';
import { CreateSpeakerDto } from './dto/create-speaker.dto';
import { UpdateSpeakerDto } from './dto/update-speaker.dto';
import { Speaker } from './entities/speaker.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from 'src/event/entities/event.entity';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { publicIdExtract } from 'src/common/helpers/public-id.extraction';

@Injectable()
export class SpeakerService {
  constructor(
    @InjectRepository(Speaker)
    private speakerRepository: Repository<Speaker>,
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
    private cloudinaryService: CloudinaryService,
  ) {}

  async getAll() {
    return await this.speakerRepository.find();
  }

  async create(payload: CreateSpeakerDto, image: Express.Multer.File) {
    const newSpeaker = new Speaker(payload);
    const { secure_url } = await this.cloudinaryService.uploadFile(image);
    newSpeaker.imagePath = secure_url;

    return await this.speakerRepository.save(newSpeaker);
  }

  async update(
    id: number,
    payload: UpdateSpeakerDto,
    image?: Express.Multer.File,
  ) {
    const speaker = await this.speakerRepository.findOneByOrFail({ id });

    if (image) {
      const publicId = publicIdExtract(speaker.imagePath);
      await this.cloudinaryService.deleteFile(publicId);
      const { secure_url } = await this.cloudinaryService.uploadFile(image);
      speaker.imagePath = secure_url;
    }

    Object.assign(speaker, payload);

    const updatedSpeaker = await this.speakerRepository.save(speaker);

    return updatedSpeaker;
  }

  async remove(id: number) {
    const speaker = await this.speakerRepository.findOneOrFail({
      where: { id },
    });
    await this.speakerRepository.remove(speaker);
  }
}
