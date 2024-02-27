import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CreateWhatIsDoneDto } from '../dto/create-what-is-done.dto';
import { Category } from 'src/categories/entities/category.entity';

@Entity()
export class WhatIsDone {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  collaborate: string;

  @Column()
  client: string;

  @Column()
  challenge: string;

  @Column({ type: String, nullable: true })
  imagePath: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createDate: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatetAt: Date;

  @ManyToOne(() => Category, { eager: true })
  @JoinColumn({ name: 'categoryName', referencedColumnName: 'name' })
  category: Category;

  constructor(payload?: Partial<CreateWhatIsDoneDto>) {
    if (!payload) return;
    this.title = payload.title;
    this.collaborate = payload.collaborate;
    this.client = payload.client;
    this.challenge = payload.challenge;
  }
}
