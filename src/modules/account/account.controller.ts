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
  HttpException,
} from '@nestjs/common';

import { JwtAuthGuard } from 'guard/jwt.guard';
import { SignupReq, LoginReq, SignupRes } from './dtos/auth.dto';
import { TokenPayload } from 'common/decorator/getToken.decorators';

import { AccountService } from './account.service';
import { MailService } from 'modules/mail/mail.service';

import { response } from 'utils/helper';
@Controller('auth')
export class AccountController {
  constructor(
    private readonly accountService: AccountService,
    private readonly mailService: MailService,
  ) {}

  @Post('signup')
  async signup(@Body() body: SignupReq) {
    return this.accountService.createAccount(body);
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: LoginReq) {
    console.log(body);

    const res = await this.accountService.loginService(body);

    return response(res);
  }

  @UseGuards(JwtAuthGuard)
  @Get('')
  async getClientAuth(@Req() payload: any) {
    try {
      console.log('Token payload', payload.user);
      const res = await this.accountService.getAllAccounts();
      return res;
    } catch (error) {
      return error;
    }
  }

  @Get('send-email')
  async verifyEmail(@Query('token') token: string) {}
}
