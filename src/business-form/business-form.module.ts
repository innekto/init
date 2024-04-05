import { Module } from '@nestjs/common';
import { BusinessFormService } from './business-form.service';
import { BusinessFormController } from './business-form.controller';
import { BusinessForm } from './entities/business-form.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Module({
  imports: [TypeOrmModule.forFeature([BusinessForm])],
  controllers: [BusinessFormController],
  providers: [BusinessFormService, CloudinaryService],
})
export class BusinessFormModule {}
