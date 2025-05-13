import { Column, OneToMany, PrimaryGeneratedColumn, Entity } from 'typeorm';
import { Products } from 'src/products/entities/product.entity';

@Entity({
  name: 'CATEGORIES',
})
export class Categories {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', {
    length: 50,
    nullable: false,
    unique: true,
  })
  name: string;

  @OneToMany(() => Products, (product) => product.category)
  products: Products[];
}
