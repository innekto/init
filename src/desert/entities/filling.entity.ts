import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { Desert } from './desert.entity';

@Entity('desrt_filling')
export class DesertFillingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: String, nullable: true })
  name: string;

  @Column({ type: String, nullable: true })
  imagePath: string;

  @ManyToMany(() => Desert, (desert) => desert.desertFilling)
  @JoinTable({ name: 'filling_to_desert' })
  desert: Desert[];
}
