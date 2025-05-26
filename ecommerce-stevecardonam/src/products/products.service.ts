import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from './entities/product.entity';
import { Repository } from 'typeorm';
import * as data from '../data.json';
import { Categories } from 'src/categories/entities/category.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private readonly productRepository: Repository<Products>,
    @InjectRepository(Categories)
    private readonly categoriesRepository: Repository<Categories>,
  ) {}

  async getProducts(page: number, limit: number): Promise<Products[]> {
    const [products] = await this.productRepository.findAndCount({
      relations: ['category'],
      skip: (page - 1) * limit,
      take: limit,
    });

    return products;
  }

  async findOne(id: string): Promise<Products> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['category'],
    });

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    return product;
  }

  async addProducts() {
    const categories = await this.categoriesRepository.find();

    if (!categories.length) {
      return 'There are no categories, run the seed for categories first';
    }

    const products = data.map((element) => {
      const category = categories.find(
        (cat) => cat.name.toLowerCase() === element.category.toLowerCase(),
      );

      if (!category) {
        throw new NotFoundException(`Category ${element.category} not found`);
      }

      const product = new Products();
      product.name = element.name;
      product.description = element.description;
      product.price = element.price;
      product.stock = element.stock;
      product.imgUrl = element.imgUrl;
      product.category = category;

      return product;
    });

    await this.productRepository
      .createQueryBuilder()
      .insert()
      .into(Products)
      .values(products)
      .orUpdate(
        ['description', 'price', 'stock', 'imgUrl', 'category_id'],
        ['name'],
      )
      .execute();

    return 'Products seeded successfully';
  }
}
