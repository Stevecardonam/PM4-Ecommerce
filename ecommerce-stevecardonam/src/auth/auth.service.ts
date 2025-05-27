import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Users } from 'src/users/entities/user.entity';
import { CreateUserDto } from '../users/dto/User.dto';
import { LoginDto } from '../users/dto/User.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Role } from 'src/roles.enum';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users) private readonly userRepository: Repository<Users>,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(user: CreateUserDto) {
    const { confirmPassword, password, ...rest } = user;

    if (password !== confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }

    const findUser = await this.userRepository.findOneBy({ email: user.email });

    if (findUser) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);

    const newUser = await this.userRepository.save({
      ...rest,
      password: hashedPassword,
      Roles: [Role.User],
    });

    const { password: _, Roles, ...cleanUser } = newUser;
    return cleanUser;
  }

  async signIn(credentials: LoginDto) {
    const findUser: Users | null = await this.userRepository.findOneBy({
      email: credentials.email,
    });

    if (!findUser) {
      throw new BadRequestException('Invalid Credentials');
    }

    const passwordMatch = await bcrypt.compare(
      credentials.password,
      findUser.password,
    );

    if (!passwordMatch) {
      throw new BadRequestException('Invalid Credentials');
    }

    const payload = {
      id: findUser.id,
      email: findUser.email,
      roles: findUser.Roles,
    };

    const token = this.jwtService.sign(payload);
    return { sucess: 'User logged in successfully', token };
  }
}
