import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export const GetProfile = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const jwt = new JwtService();
    const request = ctx.switchToHttp().getRequest();
    if (request.user) return request.user;

    if (request.headers.authorization) {
      const [, token] = request.headers.authorization.split(' ');
      const user = jwt.decode(token);
      return user;
    }

    return null;
  },
);
