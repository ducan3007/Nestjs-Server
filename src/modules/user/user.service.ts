import { Injectable } from '@nestjs/common'

@Injectable()
export class UserService {
  contructor() {}

  getUserName(): string {
    return 'John Doe'
  }
}
