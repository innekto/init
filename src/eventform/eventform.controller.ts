import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { EventformService } from './eventform.service';
import { CreateEventformDto } from './dto/create-eventform.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdminAuthGuard } from 'src/auth/guards/admin.guard';

@Controller('event-form')
@ApiTags('event-form')
export class EventformController {
  constructor(private readonly eventformService: EventformService) {}

  @Post()
  create(@Body() payload: CreateEventformDto) {
    return this.eventformService.create(payload);
  }

  @Get('all-event-form')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'get all event forms by admin' })
  @UseGuards(AdminAuthGuard)
  findAll() {
    return this.eventformService.findAll();
  }
}
