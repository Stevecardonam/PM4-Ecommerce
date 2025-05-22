import {
  Controller,
  Get,
  Post,
  Body,
  Put,
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
    return this.ordersService.findOne(id);
  }

  @ApiBearerAuth()
  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createOrderDto: CreateOrderDto) {
    const { userId, products } = createOrderDto;
    return this.ordersService.create(userId, products);
  }

  @ApiBearerAuth()
  @Put(':id')
  @UseGuards(AuthGuard)
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateOrderDto: CreateOrderDto,
  ) {
    return this.ordersService.update(id, updateOrderDto);
  }
}
