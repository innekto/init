import { ApiProperty } from '@nestjs/swagger';
import { Member } from 'src/member/entities/member.entity';
import {
  Column,
  DeepPartial,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CreateSocialDto } from '../dto/create-social.dto';

@Entity('social')
export class Social {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'linkedIn link' })
  @Column({ nullable: true })
  linkedIn: string;

  @ApiProperty({ description: 'gitHub link' })
  @Column({ nullable: true })
  gitHub: string;

  @ApiProperty({ description: 'behance link' })
  @Column({ nullable: true })
  behance: string;

  @ApiProperty({ description: 'dribble link' })
  @Column({ nullable: true })
  dribble: string;

  @ApiProperty({ description: 'instagram link' })
  @Column({ nullable: true })
  instagram: string;

  @OneToOne(() => Member, (member) => member.social)
  member: Member;

  constructor(payload?: DeepPartial<CreateSocialDto>) {
    if (!payload) return;

    this.behance = payload.behance;
    this.dribble = payload.dribble;
    this.linkedIn = payload.linkedIn;
    this.gitHub = payload.gitHub;
    this.instagram = payload.instagram;
  }
}
