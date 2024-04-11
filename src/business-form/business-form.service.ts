import { Injectable } from '@nestjs/common';
import { CreateBusinessFormDto } from './dto/create-business-form.dto';
import { isValidService } from './service-list/service-list';
import { BusinessForm } from './entities/business-form.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BusinessFormService {
  constructor(
    @InjectRepository(BusinessForm)
    private businessFormRepository: Repository<BusinessForm>,
    private mailerService: MailerService,
    private configService: ConfigService,
  ) {}

  async create(payload: CreateBusinessFormDto) {
    isValidService(payload.marketingWishes);

    const newBusinessForm = new BusinessForm(payload);
    const date = new Date();
    await this.mailerService.sendMail({
      from: this.configService.get<string>('MAILER_USER'),
      to: 'virchenko.vlad.2021@gmail.com',
      subject: 'Заявка Клієнта',
      html: `
      <p>Ім'я: ${newBusinessForm.name}</p>
      <p>Контакт: ${newBusinessForm.contact}</p>
      <p>Дата: ${date}</p>
      <p>Компанія: ${newBusinessForm.companyName}</p>
      <p>Коментар: ${newBusinessForm.comment}</p>
    `,
    });

    return await this.businessFormRepository.save(newBusinessForm);
  }

  async findAll() {
    return await this.businessFormRepository.find();
  }

  async remove(id: number) {
    return await this.businessFormRepository.delete(id);
  }
}
