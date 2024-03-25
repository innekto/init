import { Category } from 'src/categories/entities/category.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CreateServiceDto } from '../dto/create-service.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

@Entity()
export class Service {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  title: string;

  @Exclude()
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createDate: Date;

  @Exclude()
  @UpdateDateColumn({ type: 'timestamp' })
  updatetAt: Date;

  @ApiProperty()
  @ManyToOne(() => Category, { eager: true })
  @JoinColumn({ name: 'categoryName', referencedColumnName: 'name' })
  category: Category;

  constructor(payload?: Partial<CreateServiceDto>) {
    if (!payload) return;
    this.title = payload.title;
  }
}
