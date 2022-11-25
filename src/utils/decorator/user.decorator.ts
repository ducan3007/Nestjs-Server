import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const User = createParamDecorator((_data: any, context: ExecutionContext) => {
  const req = context.switchToHttp().getRequest()
  return req['account']
})
