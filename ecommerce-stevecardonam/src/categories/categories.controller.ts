import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get('seeder')
  create() {
    return this.categoriesService.createSeeder();
  }

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }
}
