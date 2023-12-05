import { Desert } from 'src/desert/entities/desert.entity';
import { User } from 'src/users/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('order')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  totalCost: number;

  @Column()
  number: number;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToMany(() => Desert, (desert) => desert.orders)
  @JoinTable({ name: 'order_to_desert' })
  deserts: Desert[];
}
