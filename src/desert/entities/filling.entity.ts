// desert-type.entity.ts

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('desrt_filling')
export class DesertFillingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: String, nullable: true })
  name: string;

  @Column({ type: String, nullable: true })
  imagePath: string;
}
