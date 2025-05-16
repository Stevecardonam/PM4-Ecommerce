import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
  HttpStatus,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/roles.enum';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('seeder')
  seedProducts() {
    return this.productsService.seed();
  }

  @Get()
  getProducts(@Query('page') page: number, @Query('limit') limit: number) {
    if (page && limit) {
      return this.productsService.getProducts(page, limit);
    }
    return this.productsService.getProducts(1, 5);
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const product = await this.productsService.findOne(id);
    return {
      statusCode: HttpStatus.OK,
      data: product,
    };
  }
  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    const result = await this.productsService.create(createProductDto);
    return { statusCode: HttpStatus.CREATED, ...result };
  }
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const result = await this.productsService.update(id, updateProductDto);
    return {
      statusCode: HttpStatus.OK,
      ...result,
    };
  }

  @Delete(':id')
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    const result = await this.productsService.remove(id);
    return {
      statusCode: HttpStatus.OK,
      ...result,
    };
  }
}
