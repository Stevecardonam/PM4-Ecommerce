import { Injectable } from '@nestjs/common';
import * as data from '../data.json';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Categories)
    private readonly categoriesRepository: Repository<Categories>,
  ) {}
  async addCategories(): Promise<string> {
    const categoriesNames = new Set(data.map((element) => element.category));
    const categoriesArray = Array.from(categoriesNames);
    const categories = categoriesArray.map((category) => ({ name: category }));

    await this.categoriesRepository
      .createQueryBuilder()
      .insert()
      .into(Categories)
      .values(categories)
      .orIgnore()
      .execute();

    return 'This action adds a new category';
  }

  async getCategories() {
    return await this.categoriesRepository.find();
  }
}
