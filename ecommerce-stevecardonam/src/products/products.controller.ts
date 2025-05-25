import {
  Controller,
  Get,
  Body,
  Put,
  Param,
  Query,
  HttpStatus,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { UpdateProductDto } from './dto/update-product.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/roles.enum';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('seeder')
  seedProducts() {
    return this.productsService.addProducts();
  }

  @Get()
  getProducts(@Query('page') page: number, @Query('limit') limit: number) {
    if (page && limit) {
      return this.productsService.getProducts(+page, +limit);
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

  @ApiBearerAuth()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const result = await this.productsService.update(id, updateProductDto);
    return {
      message: 'Product updated successfully',
      product: result,
    };
  }
}
