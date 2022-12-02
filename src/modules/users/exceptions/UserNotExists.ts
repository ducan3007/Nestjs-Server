import { HttpException, HttpStatus } from '@nestjs/common'

export class UserNotFound extends HttpException {
  constructor(msg?: string) {
    super(
      {
        code: HttpStatus.NOT_FOUND,
        message: msg || 'User not found'
      },
      HttpStatus.NOT_FOUND
    )
  }
}
