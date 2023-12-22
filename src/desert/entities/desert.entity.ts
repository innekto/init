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
import { DesertFillingEntity } from './filling.entity';
import { CreateDesertDto } from '../dto/create-desert.dto';

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

  @Column({ type: String, nullable: true })
  flavor: string;

  @Column({ type: String, nullable: true })
  decor: string;

  @Column({ type: Number, nullable: true })
  numberOfTiers: number;

  @Column({ type: String, nullable: true })
  for: string;

  @Column({ type: String, nullable: true })
  quantity: string;

  @ManyToMany(() => Order, (order) => order.deserts)
  @JoinTable({ name: 'order_to_desert' })
  orders: Order[];

  @ManyToMany(
    () => DesertFillingEntity,
    (desertFilling) => desertFilling.desert,
  )
  @JoinTable({ name: 'filling_to_desert' })
  desertFilling: DesertFillingEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  constructor(data?: CreateDesertDto) {
    if (data) {
      Object.assign(this, data);
    }
  }
}
