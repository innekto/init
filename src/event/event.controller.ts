import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AdminAuthGuard } from 'src/auth/guards/admin.guard';
import { Event } from './entities/event.entity';

@ApiTags('events')
@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  @ApiOperation({ summary: 'create event  by admin' })
  @ApiResponse({ type: Event })
  @ApiBearerAuth()
  @UseGuards(AdminAuthGuard)
  async create(@Body() createEventDto: CreateEventDto) {
    return this.eventService.create(createEventDto);
  }

  @Get()
  @ApiOperation({ summary: 'get all events (for render)' })
  @ApiResponse({ type: [Event] })
  async findAll(): Promise<Event[]> {
    return this.eventService.findAll();
  }

  @Get(':eventId')
  @ApiOperation({ summary: 'get event by id' })
  @ApiResponse({ type: Event })
  async findOne(@Param('eventId') eventId: number) {
    return this.eventService.findOne(eventId);
  }

  @Patch(':eventId')
  @ApiOperation({ summary: 'update event by admin' })
  @ApiResponse({ type: Event })
  @ApiBearerAuth()
  @UseGuards(AdminAuthGuard)
  async update(
    @Param('eventId') eventId: number,
    @Body() updateEventDto: UpdateEventDto,
  ) {
    return this.eventService.update(eventId, updateEventDto);
  }

  @Delete(':eventId')
  @ApiOperation({ summary: 'delete event by admin' })
  @ApiResponse({ type: Event })
  @ApiBearerAuth()
  @UseGuards(AdminAuthGuard)
  async remove(@Param('eventId') eventId: number) {
    return this.eventService.remove(eventId);
  }
}
