import { Exclude } from 'class-transformer';
import { Role } from 'src/common/emuns/role.emun';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CreateAdminDto } from '../dto/create-admin.dto';
import { ApiProperty } from '@nestjs/swagger';

@Entity('admin')
export class Admin {
  @ApiProperty({ description: 'admin id' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'admin email' })
  @Column({ unique: true })
  email: string;

  @ApiProperty({ description: 'admin avatar' })
  @Column({ nullable: true })
  imagePath: string;

  @ApiProperty({ description: 'admin avatar alt' })
  @Column({ nullable: true })
  imageAlt: string;

  @ApiProperty({ description: 'admin name' })
  @Column()
  name: string;

  @Exclude()
  @Column({ nullable: true })
  password: string;

  @ApiProperty({ description: 'admin role' })
  @Column({ nullable: false, default: Role.Admin })
  role: string;

  @ApiProperty({ description: 'is verify email' })
  @Column({ default: false })
  emailVerified: boolean;

  @Exclude()
  @Column({ nullable: true })
  passwordResetToken: string;

  @ApiProperty({ description: 'is online' })
  @Column({ default: false })
  isOnline: boolean;

  @Exclude()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @Exclude()
  @DeleteDateColumn({ nullable: true })
  deletedAt: Date;

  constructor(admin?: CreateAdminDto) {
    if (!admin) return;
    this.email = admin.email;
    this.name = admin.email
      .split('@')[0]
      .replace(/^\w/, (c) => c.toUpperCase());
  }
}
