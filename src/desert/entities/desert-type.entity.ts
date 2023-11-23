// desert-type.entity.ts

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('desert_types')
export class DesertTypeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: String, nullable: true })
  type: string;
}
