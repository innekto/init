import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CreateMemberDto } from '../dto/create-member.dto';

@Entity()
export class Member {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  imagePath: string;

  @Column()
  internalPosition: string;

  @Column()
  officialPosition: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createDate: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatetAt: Date;

  constructor(payload?: Partial<CreateMemberDto>) {
    if (!payload) return;
    this.name = payload.name;
    this.internalPosition = payload.internalPosition;
    this.officialPosition = payload.officialPosition;
  }
}
