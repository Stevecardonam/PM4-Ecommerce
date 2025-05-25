import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiBearerAuth()
  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.ordersService.getOrder(id);
  }

  @ApiBearerAuth()
  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createOrderDto: CreateOrderDto) {
    const { userId, products } = createOrderDto;
    const productsIds = products.map((product) => product.id);
    return this.ordersService.addOrder(userId, productsIds);
  }
}
