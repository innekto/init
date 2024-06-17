import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CreateMemberDto } from '../dto/create-member.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Image } from 'src/image/entities/image.entity';

@Entity()
export class Member {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  department: string;

  @ApiProperty()
  @Column()
  position: string;

  @Exclude()
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createDate: Date;

  @Exclude()
  @UpdateDateColumn({ type: 'timestamp' })
  updatetAt: Date;

  @OneToOne(() => Image, (image) => image.member, { eager: true })
  @JoinColumn({ name: 'imageId' })
  image: Image;

  constructor(payload?: Partial<CreateMemberDto>) {
    if (!payload) return;
    this.name = payload.name;
    this.position = payload.position;
    this.department = payload.department;
  }
}
