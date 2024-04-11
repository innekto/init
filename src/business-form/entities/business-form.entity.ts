import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { CreateBusinessFormDto } from '../dto/create-business-form.dto';

@Entity()
export class BusinessForm {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'name' })
  @Column()
  name: string;

  @ApiProperty({ description: 'contact for communication' })
  @Column()
  position: string;

  @ApiProperty({ description: 'company name' })
  @Column()
  companyName: string;

  @ApiProperty({ description: 'contact' })
  @Column()
  contact: string;

  @ApiProperty({
    description: 'marketing channels/budgets for promotion/results',
  })
  @Column()
  whatStuffsToUseNow: string;

  @ApiProperty({ description: 'services you need' })
  @Column()
  marketingWishes: string;

  @ApiProperty({ description: 'your comment' })
  @Column()
  comment: string;

  @Exclude()
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createDate: Date;

  constructor(payload?: CreateBusinessFormDto) {
    if (!payload) return;
    this.name = payload.name;
    this.position = payload.position;
    this.companyName = payload.companyName;
    this.contact = payload.contact;
    this.whatStuffsToUseNow = payload.whatStuffsToUseNow;
    this.marketingWishes = payload.marketingWishes;
    this.comment = payload.comment;
  }
}
