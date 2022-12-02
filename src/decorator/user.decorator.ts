import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { Token } from 'utils/types'

export const AuthUser = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const req = <Token>ctx.switchToHttp().getRequest()
  return req['account']
})
