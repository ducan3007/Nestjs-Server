import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';

import { AccountService } from './account.service';
import { SignupReq } from './dtos/signup.req';

@Controller('auth')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post('signup')
  async signup(@Body() body: SignupReq) {
    try {
      await this.accountService.createAccount(body);
      return 'ok';
    } catch (error) {
      return error;
    }
  }

  @Get('')
  async getAll() {
    try {
      const res = await this.accountService.getAllAccounts();
      return res;
    } catch (error) {
      return error;
    }
  }
}
