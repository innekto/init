import { Injectable } from '@nestjs/common';
import { CreateSpeakerDto } from './dto/create-speaker.dto';
import { UpdateSpeakerDto } from './dto/update-speaker.dto';
import { Speaker } from './entities/speaker.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { Repository } from 'typeorm';
import { Event } from 'src/event/entities/event.entity';
import { publicIdExtract } from 'src/common/helpers/public-id.extraction';

@Injectable()
export class SpeakerService {
  constructor(
    @InjectRepository(Speaker)
    private speakerRepository: Repository<Speaker>,
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(file: Express.Multer.File, payload: CreateSpeakerDto) {
    const upload = await this.cloudinaryService.uploadFile(file);
    const newSpeaker = new Speaker(payload);
    newSpeaker.imagePath = upload.secure_url;

    return await this.speakerRepository.save(newSpeaker);
  }

  async update(
    file: Express.Multer.File,
    id: number,
    payload: UpdateSpeakerDto,
  ) {
    const speaker = await this.speakerRepository.findOneByOrFail({ id });

    if (file) {
      const publicId = publicIdExtract(speaker.imagePath);

      await this.cloudinaryService.deleteFile(publicId);
      const upload = await this.cloudinaryService.uploadFile(file);
      speaker.imagePath = upload.secure_url;
    }

    Object.assign(speaker, payload);
    const updatedSpeaker = await this.speakerRepository.save(speaker);

    return updatedSpeaker;
  }

  async remove(id: number) {
    return await this.speakerRepository.delete({ id });
  }
}
