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

  async getOrder(id: string) {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: { orderDetails: { products: true } },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return order;
  }

  async addOrder(userId: string, productsIds: string[]) {
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

        if (product.stock <= 0) {
          throw new BadRequestException(`Product ${product.name} out of stock`);
        }

        total += Number(product.price);

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

    return await this.orderRepository.findOne({
      where: { id: newOrder.id },
      relations: {
        orderDetails: true,
      },
    });
  }
}
