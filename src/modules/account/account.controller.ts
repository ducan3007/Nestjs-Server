import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query, Req, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'guard/jwt.guard'
import { SignupReq, LoginReq } from './dtos/auth.dto'
import { AccountService } from './account.service'
import { MailService } from 'modules/mail/mail.service'
import { response } from 'utils/helper'

@Controller('auth')
export class AccountController {
  constructor(private readonly accountService: AccountService, private readonly mailService: MailService) {}

  @Post('signup')
  async signup(@Body() body: SignupReq) {
    return this.accountService.createAccount(body)
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: LoginReq) {
    const res = await this.accountService.loginService(body)

    return response(res)
  }

  @UseGuards(JwtAuthGuard)
  @Get('')
  async getClientAuth(@Req() payload: any) {
    try {
      console.log('Token payload', payload.user)
      const res = await this.accountService.getAllAccounts()
      console.log('res', res)
      console.log('res', typeof res[0]._id)

      return res
    } catch (error) {
      return error
    }
  }

  // @UseGuards(RoleGuard(Roles.ADMIN))
  @UseGuards(JwtAuthGuard)
  @Get('verify-email')
  async verifyEmail(@Req() payload: any) {
    return await this.accountService.getVerifyEmailToken(payload.account.id)
  }

  @Get('verify-token')
  async verifyEmailToken(@Query('token') token: string) {
    const res = await this.accountService.verifyEmail(token)
    return res
  }
}
