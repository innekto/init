import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity('roles')
export class Role {
  @ApiProperty({ example: '1', description: 'ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'ADMIN', description: 'role value' })
  @Column({ type: String, nullable: true, unique: true })
  value: string;

  @ApiProperty({ example: 'administrator', description: 'role description' })
  @Column({ type: String, nullable: true, unique: true })
  description: string;
}
