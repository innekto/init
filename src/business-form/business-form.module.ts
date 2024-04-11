import { Module } from '@nestjs/common';
import { BusinessFormService } from './business-form.service';
import { BusinessFormController } from './business-form.controller';
import { BusinessForm } from './entities/business-form.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([BusinessForm])],
  controllers: [BusinessFormController],
  providers: [BusinessFormService, ConfigService],
})
export class BusinessFormModule {}
