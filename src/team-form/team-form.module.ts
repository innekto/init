import { Module } from '@nestjs/common';
import { TeamFormService } from './team-form.service';
import { TeamFormController } from './team-form.controller';
import { TeamForm } from './entities/team-form.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([TeamForm])],
  controllers: [TeamFormController],
  providers: [TeamFormService, CloudinaryService, ConfigService],
})
export class TeamFormModule {}
