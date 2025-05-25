import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { CategoriesService } from 'src/categories/categories.service';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class SeederService implements OnApplicationBootstrap {
  private readonly logger = new Logger(SeederService.name);

  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly productsService: ProductsService,
  ) {}

  async onApplicationBootstrap() {
    this.logger.log('Running seeders on application bootstrap...');

    try {
      await this.categoriesService.addCategories();
      this.logger.log('Categories seeded successfully');
      await this.productsService.addProducts();
      this.logger.log('Products seeded successfully');
    } catch (error) {
      this.logger.error('Seeding failed', error);
    }
  }
}
