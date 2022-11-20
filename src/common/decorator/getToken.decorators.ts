import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const TokenPayload = createParamDecorator((_data: any, context: ExecutionContext) => {
  const req = context.switchToHttp().getRequest()
  return req['account']
})
