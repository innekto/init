// desert-type.entity.ts
import { DesertType } from 'src/common/types/desertTypes';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('desert_types')
export class DesertTypeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: DesertType, nullable: true })
  type: DesertType;
}
