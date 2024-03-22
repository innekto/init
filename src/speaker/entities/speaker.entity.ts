import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CreateSpeakerDto } from '../dto/create-speaker.dto';
import { Event } from 'src/event/entities/event.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Speaker {
  @ApiProperty({ description: 'speaker id' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'speaker imagePath' })
  @Column()
  imagePath: string;

  @ApiProperty({ description: 'speaker name' })
  @Column()
  name: string;

  @ManyToMany(() => Event, (event) => event.speakers, {
    onDelete: 'CASCADE',
  })
  @JoinTable({ name: 'speaker_to_event' })
  events: Event[];

  constructor(payload?: Partial<CreateSpeakerDto>) {
    if (!payload) return;
    this.name = payload.name;
  }
}
