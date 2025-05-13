import { Orders } from 'src/orders/entities/order.entity';
import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm';

@Entity({
  name: 'USERS',
})
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', {
    length: 50,
    nullable: false,
  })
  name: string;

  @Column('varchar', {
    length: 50,
    nullable: false,
    unique: true,
  })
  email: string;

  @Column('varchar', {
    length: 70,
    nullable: false,
  })
  password: string;

  @Column('bigint')
  phone: number;

  @Column('varchar', {
    length: 50,
  })
  country: string;

  @Column('text')
  address: string;

  @Column('varchar', {
    length: 50,
  })
  city: string;

  @Column('boolean', {
    default: false,
  })
  isAdmin: boolean;

  @OneToMany(() => Orders, (order) => order.user)
  orders: Orders[];
}
