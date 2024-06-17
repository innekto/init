import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CreateEventformDto } from '../dto/create-eventform.dto';

@Entity('event_form')
export class Eventform {
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

  constructor(payload?: CreateEventformDto) {
    if (!payload) return;
    this.name = payload.name;
    this.phone = payload.phone;
    this.email = payload.email;
  }
}
