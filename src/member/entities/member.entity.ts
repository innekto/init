import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CreateMemberDto } from '../dto/create-member.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

@Entity()
export class Member {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  imagePath: string;

  @ApiProperty()
  @Column()
  internalPosition: string;

  @ApiProperty()
  @Column()
  officialPosition: string;

  @Exclude()
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createDate: Date;

  @Exclude()
  @UpdateDateColumn({ type: 'timestamp' })
  updatetAt: Date;

  constructor(payload?: Partial<CreateMemberDto>) {
    if (!payload) return;
    this.name = payload.name;
    this.internalPosition = payload.internalPosition;
    this.officialPosition = payload.officialPosition;
  }
}
