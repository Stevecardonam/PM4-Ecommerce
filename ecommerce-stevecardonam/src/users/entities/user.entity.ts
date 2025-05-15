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
  })
  name: string;

  @Column('varchar', {
    length: 50,
    unique: true,
  })
  email: string;

  @Column('varchar', {
    length: 70,
  })
  password: string;

  @Column('bigint', {
    nullable: true,
  })
  phone: number;

  @Column('varchar', {
    nullable: true,
    length: 50,
  })
  country: string;

  @Column('text', {
    nullable: true,
  })
  address: string;

  @Column('varchar', {
    nullable: true,
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
