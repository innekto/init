import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventformDto } from './dto/create-eventform.dto';

import { EventForm } from './entities/eventform.entity';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from 'src/event/entities/event.entity';

@Injectable()
export class EventformService {
  constructor(
    @InjectRepository(EventForm)
    private eventFormRepository: Repository<EventForm>,
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
    private mailerService: MailerService,
    private configService: ConfigService,
  ) {}

  async create(payload: CreateEventformDto) {
    try {
      const existEvent = await this.eventRepository.exist({
        where: { id: payload.eventId },
      });
      if (!existEvent) throw new NotFoundException('Event not found');

      const newEventForm = new EventForm(payload);
      const savedEvent = await this.eventFormRepository.save(newEventForm);

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
