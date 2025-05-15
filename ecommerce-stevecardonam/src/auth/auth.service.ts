// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { UsersService } from '../users/users.service';
// import { JwtService } from '@nestjs/jwt';
// import * as bcrypt from 'bcrypt';
// import { LoginUserDto } from './dto/login-user.dto';

// @Injectable()
// export class AuthService {
//   constructor(
//     private readonly usersService: UsersService,
//     private readonly jwtService: JwtService,
//   ) {}

//   async validateUser(email: string, password: string) {
//     const user = await this.usersService.findByEmail(email);
//     if (!user) throw new UnauthorizedException('Credenciales inválidas');

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) throw new UnauthorizedException('Credenciales inválidas');

//     return user;
//   }

//   async login(loginDto: LoginUserDto) {
//     const user = await this.validateUser(loginDto.email, loginDto.password);

//     const payload = { sub: user.id, email: user.email };
//     const token = await this.jwtService.signAsync(payload);

//     return {
//       access_token: token,
//       user: {
//         id: user.id,
//         email: user.email,
//         name: user.name,
//       },
//     };
//   }
// }
