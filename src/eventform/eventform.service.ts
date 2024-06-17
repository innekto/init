import { Injectable } from '@nestjs/common';
import { CreateEventformDto } from './dto/create-eventform.dto';

import { Eventform } from './entities/eventform.entity';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class EventformService {
  constructor(
    @InjectRepository(Eventform)
    private eventRepository: Repository<Eventform>,
    private mailerService: MailerService,
    private configService: ConfigService,
  ) {}

  async create(payload: CreateEventformDto) {
    try {
      const newEventForm = new Eventform(payload);
      const savedEvent = await this.eventRepository.save(newEventForm);

      const date = new Date();

      await this.mailerService.sendMail({
        from: this.configService.get<string>('MAILER_USER'),
        to: 'tuppefreupaummau-2893@yopmail.com',
        subject: 'Заявка Клієнта',
        html: `<p>Ім'я: ${savedEvent.name}</p>
               <p>Телефон: ${savedEvent.phone}</p>
               <p>Імейл: ${savedEvent.email}</p>
               <p>Дата: ${date}</p>
        `,
      });

      return savedEvent;
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    return await this.eventRepository.find();
  }

  remove(id: number) {
    return `This action removes a #${id} eventform`;
  }
}
