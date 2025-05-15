import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;

    if (!authHeader) return false;

    const token = authHeader.split(' ')[1];

    if (!token) return false;

    try {
      const secret = process.env.JWT_SECRET;
      const user = this.jwtService.verify(token, { secret });

      user.exp = new Date(user.exp * 1000);
      user.iat = new Date(user.iat * 1000);

      console.log(user);
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
    return true; 
  }
}
