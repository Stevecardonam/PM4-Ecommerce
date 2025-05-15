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
  })
  name: string;

  @Column('text')
  description: string;

  @Column('decimal', {
    precision: 10,
    scale: 2,
  })
  price: number;

  @Column('int')
  stock: number;

  @Column('text', {
    default: 'No image',
  })
  imgUrl: string;

  @ManyToOne(() => Categories, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  category: Categories; 

  @ManyToMany(() => OrderDetails, (orderDetails) => orderDetails.products)
  orderDetails: OrderDetails[];
}
