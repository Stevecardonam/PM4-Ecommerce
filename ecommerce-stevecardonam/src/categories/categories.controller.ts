import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get('seeder')
  create() {
    return this.categoriesService.addCategories();
  }

  @Get()
  findAll() {
    return this.categoriesService.getCategories();
  }
}
