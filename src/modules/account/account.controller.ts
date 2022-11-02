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
import { SignupReq } from './dtos/signup.req';

@Controller('auth')
export class AccountController {
  constructor() {}

  @Post('signup')
  async signup(@Body() body: SignupReq) {
    console.log('body', body);
    return 'ok';
  }

  @Get('')
  async auth() {
    return 'ok';
  }
}
