import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query, Req, UseGuards } from '@nestjs/common'

@Controller('gateway')
export class GatewayController {
  @Get('test')
  async test() {}
}
