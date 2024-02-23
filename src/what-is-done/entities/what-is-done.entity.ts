import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CreateWhatIsDoneDto } from '../dto/create-what-is-done.dto';

@Entity()
export class WhatIsDone {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: String, nullable: true })
  imagePath: string;

  @Column('jsonb', { nullable: true })
  jsonData: any;

  constructor(payload?: CreateWhatIsDoneDto) {
    if (!payload) return;
    this.jsonData = { ...payload };
  }
}
