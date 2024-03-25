import { ApiProperty } from '@nestjs/swagger';
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
import { Exclude } from 'class-transformer';

@Entity()
export class WhoWeAre {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty()
  @Column()
  description: string;

  @ApiProperty()
  @Column({ type: String, nullable: true })
  imagePath: string;

  @Exclude()
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createDate: Date;

  @Exclude()
  @UpdateDateColumn({ type: 'timestamp' })
  updatetAt: Date;

  @Exclude()
  @DeleteDateColumn({ nullable: true })
  deletedAt: Date;

  constructor(payload?: DeepPartial<CreateWhoWeAreDto>) {
    if (!payload) return;
    this.title = payload.title;
    this.description = payload.description;
  }
}
