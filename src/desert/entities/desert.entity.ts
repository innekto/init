import { Order } from 'src/order/entities/order.entity';
import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
} from 'typeorm';

@Entity('desert')
export class Desert {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: String, nullable: true })
  type: string;

  @Column({ type: String, nullable: true })
  name: string;

  @Column({ type: Number, nullable: true })
  price: number;

  @Column({ type: String, nullable: true })
  imagePath: string;

  @Column({ type: Number, nullable: true })
  weight: number;

  @Column({ type: String, nullable: true })
  composition: string;

  @ManyToMany(() => Order, (order) => order.deserts)
  @JoinTable({ name: 'order_to_desert' })
  orders: Order[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
