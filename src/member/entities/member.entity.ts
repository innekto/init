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
import { Social } from 'src/social/entities/social.entity';

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

  @ApiProperty({ description: 'member avatar' })
  @Column({ nullable: false })
  imagePath: string;

  @ApiProperty({ description: 'member avatar description' })
  @Column({ nullable: true })
  imageAlt: string;

  @Exclude()
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createDate: Date;

  @Exclude()
  @UpdateDateColumn({ type: 'timestamp' })
  updatetAt: Date;

  @OneToOne(() => Social, (social) => social.member, {
    eager: true,
    cascade: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'socialId' })
  social: Social;

  constructor(payload?: Partial<CreateMemberDto>) {
    if (!payload) return;
    this.name = payload.name;
    this.position = payload.position;
    this.department = payload.department;
    this.imageAlt = payload.imageAlt;
  }
}
