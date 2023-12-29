import { Exclude } from 'class-transformer';
import { Desert } from 'src/desert/entities/desert.entity';
import { Order } from 'src/order/entities/order.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: String, nullable: true })
  name: string;

  @Exclude({ toPlainOnly: true })
  @Column({ type: String, nullable: true })
  password: string;

  @Column({ type: String, nullable: true })
  phone: string;

  @Column({ type: String, nullable: true, unique: true })
  email: string;

  @Exclude()
  @Column({ default: null })
  hash: string;

  @Column({ type: Boolean, default: false })
  isConfirm: boolean;

  @Column({ type: Boolean, default: false })
  online: boolean;

  @Exclude()
  @Column({ type: String, nullable: true, default: 'user' })
  role: string;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @ManyToMany(() => Desert, { cascade: true })
  @JoinTable({ name: 'favorite_deserts' })
  favoriteDesserts: Desert[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
