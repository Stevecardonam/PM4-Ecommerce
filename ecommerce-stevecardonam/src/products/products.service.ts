import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductDto } from './dto/create-product.dto';
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

  async getProducts(page = 1, limit = 5): Promise<Products[]> {
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

  async create(dto: CreateProductDto): Promise<{ id: string }> {
    const category = await this.categoriesRepository.findOne({
      where: { id: dto.categoryId },
    });

    if (!category) {
      throw new BadRequestException('Invalid category ID');
    }

    const newProduct = this.productRepository.create({ ...dto, category });

    const savedProduct = await this.productRepository.save(newProduct);
    return { id: savedProduct.id };
  }
  async update(id: string, dto: UpdateProductDto): Promise<{ id: string }> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    if (dto.categoryId) {
      const category = await this.categoriesRepository.findOne({
        where: { id: dto.categoryId },
      });
      if (!category) {
        throw new BadRequestException('Invalid category ID');
      }
      product.category = category;
    }

    Object.assign(product, dto);
    await this.productRepository.save(product);
    return { id };
  }

  async remove(id: string): Promise<{ id: string }> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    await this.productRepository.remove(product);
    return { id };
  }

  async seed(): Promise<string> {
    const categories: Categories[] = await this.categoriesRepository.find();

    const products: Products[] = data.map((element) => {
      const category: Categories | undefined = categories.find(
        (category) => element.category === category.name,
      );
      const newProduct = new Products();
      newProduct.name = element.name;
      newProduct.description = element.description;
      newProduct.price = element.price;
      newProduct.stock = element.stock;
      newProduct.imgUrl = element.imgUrl;
      newProduct.category = category!;

      return newProduct;
    });

    await this.categoriesRepository
      .createQueryBuilder()
      .insert()
      .into(Products)
      .values(products)
      .orIgnore()
      .execute();

    return 'This action adds products';
  }
}
