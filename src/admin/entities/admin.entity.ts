import { Exclude } from 'class-transformer';
import { Role } from 'src/common/emuns/role.emun';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CreateAdminDto } from '../dto/create-admin.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Image } from 'src/image/entities/image.entity';

@Entity('admin')
export class Admin {
  @ApiProperty({ description: 'admin id' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'admin email' })
  @Column({ unique: true })
  email: string;

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

  @OneToOne(() => Image, (image) => image.admin, { eager: true })
  @JoinColumn({ name: 'imageId' })
  image: Image;

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
