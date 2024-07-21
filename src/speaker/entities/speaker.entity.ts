import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CreateSpeakerDto } from '../dto/create-speaker.dto';
import { Event } from 'src/event/entities/event.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Speaker {
  @ApiProperty({ description: 'speaker id' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'speaker name' })
  @Column()
  name: string;

  @ApiProperty({ description: 'speaker avatar' })
  @Column({ nullable: false })
  imagePath: string;

  @ApiProperty({ description: 'speaker avatar description' })
  @Column({ nullable: true })
  imageAlt: string;

  @ManyToMany(() => Event, (event) => event.speakers, {
    onDelete: 'CASCADE',
  })
  events: Event[];

  constructor(payload?: Partial<CreateSpeakerDto>) {
    if (!payload) return;
    this.name = payload.name;
    this.imageAlt = payload.imageAlt;
  }
}
