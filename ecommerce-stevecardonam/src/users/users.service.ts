import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Users } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto } from './dto/User.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}

  async getUsers(page: number, limit: number) {
    let users = await this.userRepository.find();

    const start = (page - 1) * limit;
    const end = start + limit;

    users = users.slice(start, end);

    return users.map(({ password, ...user }) => user);
  }

  async getUser(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['orders'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }
    const { password, Roles, orders, ...userWithout } = user;

    const simplyOrder = orders.map(({ id, date }) => ({ id, date }));

    return {
      ...userWithout,
      orders: simplyOrder,
    };
  }

  async updateUser(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<Partial<Users>> {
    const user = await this.userRepository.preload({ id, ...updateUserDto });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const updateUser = await this.userRepository.save(user);

    const { password, Roles, ...safeUser } = updateUser;

    return safeUser;
  }
}
