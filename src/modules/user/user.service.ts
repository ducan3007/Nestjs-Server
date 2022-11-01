import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  getUserName(): string {
    return 'John Doe';
  }
}
