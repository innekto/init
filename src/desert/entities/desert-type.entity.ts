// desert-type.entity.ts

import { Exclude } from 'class-transformer';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('desert_types')
export class DesertTypeEntity {
  @Exclude()
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: String, nullable: true })
  type: string;
}
