import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CreateImageDto } from '../dto/create-image.dto';
import { Speaker } from 'src/speaker/entities/speaker.entity';
import { WhatIsDone } from 'src/what-is-done/entities/what-is-done.entity';
import { WhoWeAre } from 'src/who-we-are/entities/who-we-are.entity';

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

  @OneToOne(() => Speaker, (speaker) => speaker.image, { cascade: true })
  speaker: Speaker;

  @OneToOne(() => WhatIsDone, (whatIsDone) => whatIsDone.image, {
    cascade: true,
  })
  whatIsDone: WhatIsDone;

  @OneToOne(() => WhoWeAre, (whoWeAre) => whoWeAre.image)
  whoWeAre: WhoWeAre;

  constructor(payload?: Partial<CreateImageDto>) {
    if (!payload) return;
    this.description = payload.description;
  }
}
