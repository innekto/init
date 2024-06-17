import { Module } from '@nestjs/common';
import { EventformService } from './eventform.service';
import { EventformController } from './eventform.controller';
import { Eventform } from './entities/eventform.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([Eventform])],
  controllers: [EventformController],
  providers: [EventformService, ConfigService],
})
export class EventformModule {}
