import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CreateSpeakerDto } from '../dto/create-speaker.dto';
import { Event } from 'src/event/entities/event.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Image } from 'src/image/entities/image.entity';

@Entity()
export class Speaker {
  @ApiProperty({ description: 'speaker id' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'speaker name' })
  @Column()
  name: string;

  @ManyToMany(() => Event, (event) => event.speakers, {
    onDelete: 'CASCADE',
  })
  events: Event[];

  @OneToOne(() => Image, (image) => image.speaker, { eager: true })
  @JoinColumn({ name: 'imageId' })
  image: Image;

  constructor(payload?: Partial<CreateSpeakerDto>) {
    if (!payload) return;
    this.name = payload.name;
  }
}
