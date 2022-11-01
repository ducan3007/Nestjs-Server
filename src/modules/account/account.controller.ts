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

@Controller('auth')
export class AccountController {
  constructor() {}

  @Post('signup')
  @HttpCode(200)
  async signup(@Body() body: any) {
    return 'ok';
  }
}
