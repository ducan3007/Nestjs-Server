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

import { JwtAuthGuard } from 'guard/jwt.guard';
import { SignupReq } from './dtos/signup.req';

import { AccountService } from './account.service';
import { MailService } from 'modules/mail/mail.service';

@Controller('auth')
export class AccountController {
   constructor(
      private readonly accountService: AccountService,
      private readonly mailService: MailService,
   ) {}

   @Post('signup')
   async signup(@Body() body: SignupReq) {
      try {
         await this.accountService.createAccount(body);
         return 'ok';
      } catch (error) {
         return error;
      }
   }

   @UseGuards(JwtAuthGuard)
   @Get('')
   async getClientAuth() {
      try {
         const res = await this.accountService.getAllAccounts();
         return res;
      } catch (error) {
         return error;
      }
   }

   @Get('send-email')
   async verifyEmail(@Query('token') token: string) {}
}
