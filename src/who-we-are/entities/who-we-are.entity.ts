import { CreateWhoWeAreDto } from '../dto/create-who-we-are.dto';
import {
  Column,
  CreateDateColumn,
  DeepPartial,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class WhoWeAre {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: String, nullable: true })
  imagePath: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createDate: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatetAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date;

  constructor(payload?: DeepPartial<CreateWhoWeAreDto>) {
    if (!payload) return;
    this.title = payload.title;
    this.description = payload.description;
  }
}
