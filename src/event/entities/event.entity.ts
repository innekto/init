import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CreateEventDto } from '../dto/create-event.dto';
import { Speaker } from 'src/speaker/entities/speaker.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { EventForm } from 'src/eventform/entities/eventform.entity';

@Entity()
export class Event {
  @ApiProperty({ description: 'event id' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'event name' })
  @Column()
  name: string;

  @ApiProperty({ description: 'event date' })
  @Column()
  date: string;

  @ApiProperty({ description: 'event location' })
  @Column()
  location: string;

  @ApiProperty({ description: 'description' })
  @Column()
  description: string;

  @Exclude()
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createDate: Date;

  @ApiProperty({ type: () => Speaker, description: 'event speakers' })
  @ManyToMany(() => Speaker, (speaker) => speaker.events, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinTable({ name: 'speaker_to_event' })
  speakers: Speaker[];

  @OneToMany(() => EventForm, (eventForm) => eventForm.event, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  eventForm: EventForm[];

  constructor(payload?: Partial<CreateEventDto>) {
    if (!payload) return;
    this.name = payload.name;
    this.date = payload.date;
    this.location = payload.location;
    this.description = payload.description;
  }
}
