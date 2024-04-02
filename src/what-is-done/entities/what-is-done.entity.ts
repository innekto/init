import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CreateWhatIsDoneDto } from '../dto/create-what-is-done.dto';
import { Category } from 'src/categories/entities/category.entity';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Image } from 'src/image/entities/image.entity';

@Entity()
export class WhatIsDone {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty()
  @Column()
  collaborate: string;

  @ApiProperty()
  @Column()
  client: string;

  @ApiProperty()
  @Column()
  challenge: string;

  @Exclude()
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createDate: Date;

  @Exclude()
  @UpdateDateColumn({ type: 'timestamp' })
  updatetAt: Date;

  @ApiProperty()
  @ManyToOne(() => Category, { eager: true })
  @JoinColumn({ name: 'categoryName', referencedColumnName: 'name' })
  category: Category;

  @OneToOne(() => Image, (image) => image.whatIsDone)
  @JoinColumn({ name: 'imageId' })
  image: Image;

  constructor(payload?: Partial<CreateWhatIsDoneDto>) {
    if (!payload) return;
    this.title = payload.title;
    this.collaborate = payload.collaborate;
    this.client = payload.client;
    this.challenge = payload.challenge;
  }
}
