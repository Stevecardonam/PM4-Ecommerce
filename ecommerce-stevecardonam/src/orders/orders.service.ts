import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/users/entities/user.entity';
import { Orders } from 'src/orders/entities/order.entity';
import { Repository } from 'typeorm';
import { OrderDetails } from './entities/orderDetails.entity';
import { Products } from 'src/products/entities/product.entity';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    @InjectRepository(Orders)
    private readonly orderRepository: Repository<Orders>,
    @InjectRepository(Products)
    private readonly productRepository: Repository<Products>,
    @InjectRepository(OrderDetails)
    private readonly orderDetailsRepository: Repository<OrderDetails>,
  ) {}
  async create(userId: string, productsIds: string[]) {
    const user: Users | null = await this.userRepository.findOneBy({
      id: userId,
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const order = new Orders();
    order.date = new Date();
    order.user = user;

    const newOrder: Orders = await this.orderRepository.save(order);

    let total = 0;
    const productsArrays: Products[] = await Promise.all(
      productsIds.map(async (productId) => {
        const product: Products | null = await this.productRepository.findOneBy(
          {
            id: productId,
          },
        );
        if (!product) {
          throw new NotFoundException(`Product with id ${productId} not found`);
        }
        total += Number(product.price);

        if (product.stock <= 0) {
          throw new BadRequestException(`Product ${product.name} out of stock`);
        }

        await this.productRepository.update(
          { id: product.id },
          { stock: product.stock - 1 },
        );
        return product;
      }),
    );

    const orderDetails = new OrderDetails();
    orderDetails.order = newOrder;
    orderDetails.price = Number(total.toFixed(2));
    orderDetails.products = productsArrays;

    await this.orderDetailsRepository.save(orderDetails);

    return await this.orderRepository.find({
      where: { id: newOrder.id },
      relations: {
        orderDetails: true,
      },
    });
  }

  async update(orderId: string, updateOrderDto: CreateOrderDto) {
    const order = await this.orderRepository.findOne({
      where: { id: orderId },
      relations: { orderDetails: true },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    const user = await this.userRepository.findOneBy({
      id: updateOrderDto.userId,
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    let total = 0;
    const products = await Promise.all(
      updateOrderDto.products.map(async ({ id }) => {
        const product = await this.productRepository.findOneBy({ id });
        if (!product) {
          throw new NotFoundException(`Product with id ${id} not found`);
        }
        if (product.stock <= 0) {
          throw new BadRequestException('Product out of stock');
        }
        total += Number(product.price);
        return product;
      }),
    );

    order.user = user;
    order.date = new Date();
    await this.orderRepository.save(order);

    const orderDetails = order.orderDetails;
    orderDetails.products = products;
    orderDetails.price = Number(total.toFixed(2));
    await this.orderDetailsRepository.save(orderDetails);

    return await this.orderRepository.find({
      where: { id: order.id },
      relations: { orderDetails: true },
    });
  }

  async findAll() {
    return await this.orderRepository.find({
      relations: { orderDetails: { products: true }},
    });
  }

  async findOne(id: string) {
    const order = await this.orderRepository.find({
      where: { id },
      relations: { orderDetails: { products: true }},
    });

    if (!order || order.length === 0) {
      throw new NotFoundException('Order not found');
    }

    return order;
  }

  async remove(id: string) {
    const order = await this.orderRepository.findOneBy({ id });
    if (!order) {
      throw new NotFoundException('Order not found');
    }

    await this.orderRepository.remove(order);
    return { message: 'Order deleted' };
  }
}
