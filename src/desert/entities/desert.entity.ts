import { Exclude } from 'class-transformer';
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

  @Column({ type: String, nullable: true })
  @Exclude({ toPlainOnly: true })
  type: string;

  @Column({ type: String, nullable: true })
  name: string;

  @Column({ type: String, nullable: true })
  price: string;

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
