import { Exclude } from 'class-transformer';

import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: String, nullable: true })
  name: string;

  @Exclude({ toPlainOnly: true })
  @Column({ type: String, nullable: true })
  password: string;

  @Column({ type: String, nullable: true })
  phone: string;

  @Column({ type: String, nullable: true, unique: true })
  email: string;

  @Exclude()
  @Column({ default: null })
  hash: string;

  @Column({ type: Boolean, default: false })
  isConfirm: boolean;

  @Column({ type: Boolean, default: false })
  online: boolean;

  @Exclude()
  @Column({ type: String, nullable: true, default: 'user' })
  role: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
