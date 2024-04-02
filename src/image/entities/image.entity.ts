import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CreateImageDto } from '../dto/create-image.dto';
import { Member } from 'src/member/entities/member.entity';

@Entity()
export class Image {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  imagePath: string;

  @ApiProperty()
  @Column({ nullable: false })
  description: string;

  @OneToOne(() => Member, (member) => member.image, { cascade: true })
  member: Member;

  constructor(payload?: Partial<CreateImageDto>) {
    if (!payload) return;
    this.description = payload.description;
  }
}
