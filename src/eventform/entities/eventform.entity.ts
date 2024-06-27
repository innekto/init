import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CreateEventformDto } from '../dto/create-eventform.dto';
import { Event } from 'src/event/entities/event.entity';

@Entity('event_form')
export class EventForm {
  @ApiProperty({ description: 'event form id' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'user name' })
  @Column()
  name: string;

  @ApiProperty({ description: 'user phone' })
  @Column({ unique: true })
  phone: string;

  @ApiProperty({ description: 'user email' })
  @Column({ unique: true })
  email: string;

  @ManyToOne(() => Event, (event) => event.eventForm)
  event: Event;

  constructor(payload?: CreateEventformDto) {
    if (!payload) return;
    this.name = payload.name;
    this.phone = payload.phone;
    this.email = payload.email;
    this.event = { id: payload.eventId } as any;
  }
}
