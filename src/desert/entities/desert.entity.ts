import { DesertType } from 'src/common/types/desertTypes';
import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Entity,
} from 'typeorm';

@Entity('desert')
export class Desert {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: DesertType, nullable: true })
  type: DesertType;

  @Column({ type: String, nullable: true })
  name: string;

  @Column({ type: Number, nullable: true })
  price: number;

  @Column({ type: String, nullable: true })
  imagePath: string;

  @Column({ type: Number, nullable: true })
  weight: number;

  @Column({ type: String, nullable: true })
  composition: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
