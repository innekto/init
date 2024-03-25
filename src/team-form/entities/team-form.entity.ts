import { ApiProperty } from '@nestjs/swagger';

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CreateTeamFormDto } from '../dto/create-team-form.dto';

@Entity()
export class TeamForm {
  @ApiProperty({ description: 'form id' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'candidate name' })
  @Column()
  name: string;

  @ApiProperty({ description: 'candidate position' })
  @Column()
  position: string;

  @ApiProperty({ description: 'candidate email' })
  @Column({ type: String, nullable: false, unique: true })
  email: string;

  @ApiProperty({ description: 'candidate CV' })
  @Column()
  cvPath: string;

  @ApiProperty({ description: 'candidate text' })
  @Column()
  description: string;

  constructor(payload?: Partial<CreateTeamFormDto>) {
    if (!payload) return;
    this.name = payload.name;
    this.position = payload.position;
    this.email = payload.email;
    this.description = payload.description;
  }
}
