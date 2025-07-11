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

    if (!authHeader)
      throw new UnauthorizedException('Authorization header missing');

    const token = authHeader.split(' ')[1];

    if (!token) throw new UnauthorizedException('Token not found');

    try {
      const secret = process.env.JWT_SECRET;
      const user = this.jwtService.verify(token, { secret });

      req.user = {
        ...user,
        exp: new Date(user.exp * 1000),
        iat: new Date(user.iat * 1000),
      };
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }

    return true;
  }
}
