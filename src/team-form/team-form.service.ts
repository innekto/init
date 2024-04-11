import { Injectable } from '@nestjs/common';
import { CreateTeamFormDto } from './dto/create-team-form.dto';
import { TeamForm } from './entities/team-form.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class TeamFormService {
  constructor(
    @InjectRepository(TeamForm)
    private formRepository: Repository<TeamForm>,
    private readonly cloudinaryService: CloudinaryService,
    private configService: ConfigService,
    private mailerService: MailerService,
  ) {}

  async create(file: Express.Multer.File, payload: CreateTeamFormDto) {
    const newForm = new TeamForm(payload);

    if (file) {
      const upload = await this.cloudinaryService.uploadFile(file);
      newForm.cvPath = upload.secure_url;
    }

    const date = new Date();

    let savedForm: TeamForm;
    try {
      savedForm = await this.formRepository.save(newForm);

      await this.mailerService.sendMail({
        from: this.configService.get<string>('MAILER_USER'),
        to: 'virchenko.vlad.2021@gmail.com',
        subject: 'Заявка Кандидата',
        html: `
          <p>Ім'я: ${newForm.name}</p>
          <p>Пошта: ${newForm.email}</p>
          <p>Дата: ${date}</p>
          <p>Навички: ${newForm.position}</p>
          <p>Коментар: ${newForm.description}</p>
        `,
      });
    } catch (error) {
      throw error;
    }
    return savedForm;
  }

  async findAll() {
    return await this.formRepository.find();
  }

  async remove(id: number) {
    return await this.formRepository.delete(id);
  }
}
