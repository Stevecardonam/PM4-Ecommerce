import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Users } from 'src/users/entities/user.entity';
import { CreateUserDto, LoginDto } from 'src/users/dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users) private readonly userRepository: Repository<Users>,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(user: CreateUserDto) {
    const { confirmPassword, ...userWithoutPassword } = user;

    const findUser = await this.userRepository.findOneBy({ email: user.email });

    if (findUser) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);

    const newUser = await this.userRepository.save({
      ...userWithoutPassword,
      password: hashedPassword,
    });

    const { password, ...cleanUser } = newUser;
    return cleanUser;
  }

  async signIn(credentials: LoginDto) {
    const findUser = await this.userRepository.findOneBy({
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
      isAdmin: findUser.isAdmin,
    };

    const token = this.jwtService.sign(payload);
    return { access_token: token };
  }
}
