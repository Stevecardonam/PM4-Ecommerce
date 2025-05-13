import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Categories } from '../../categories/entities/category.entity';
import { OrderDetails } from 'src/orders/entities/orderDetails.entity';

@Entity({
  name: 'PRODUCTS',
})
export class Products {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', {
    length: 50,
    unique: true,
    nullable: false,
  })
  name: string;

  @Column('text', {
    nullable: false,
  })
  description: string;

  @Column('decimal', {
    precision: 10,
    scale: 2, // corregido
    nullable: false,
  })
  price: number;

  @Column('int', {
    nullable: false,
  })
  stock: number;

  @Column('text', {
    nullable: false,
  })
  imgUrl: string;

  @ManyToOne(() => Categories, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  category: Categories; // corregido: no es un array

  @ManyToMany(() => OrderDetails, (orderDetails) => orderDetails.products)
  orderDetails: OrderDetails[];
}
