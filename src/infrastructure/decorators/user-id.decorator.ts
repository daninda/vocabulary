import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserId = createParamDecorator(
  (data: never, ctx: ExecutionContext): string => {
    const httpContext = ctx.switchToHttp();
    const request = httpContext.getRequest();
    const user = request['user'];
    return user['userId'];
  },
);
