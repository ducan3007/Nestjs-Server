import { Body, Controller, Get, HttpCode, Res, HttpStatus, Post, Query, Req, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'modules/auth/guard/Jwt.guard'
import { SignupReq, LoginReq } from './dtos/auth.dto'
import { AccountService } from './account.service'
import { Response } from 'express'
import { response } from 'utils/helper'
// import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger'

// import RoleGuard from 'modules/auth/guard/Roles.admin'
// import { Roles } from 'common/interfaces'

// @ApiTags('Authentication')
@Controller('auth')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  // @ApiResponse({
  //   type: SignupReq
  // })
  // @ApiOperation({ summary: 'Đăng ký' })
  @Post('signup')
  async signup(@Body() body: SignupReq) {
    return response(await this.accountService.createAccount(body))
  }

  // @ApiResponse({
  //   type: LoginRes
  // })
  // @ApiOperation({ summary: 'Đăng nhập' })
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: LoginReq, @Res() res: Response) {
    const token = await this.accountService.loginService(body)
    const jwtCookie = `Authentication=${token}; HttpOnly; Path=/; Max-Age=${process.env.JWT_EXPIRES_IN}`
    console.log('jwtCookie', jwtCookie)
    res.setHeader('Set-Cookie', jwtCookie)
    return res.send(response(token))
  }

  // @ApiOperation({ summary: 'Lấy tất cả accounts' })
  // @UseGuards(RoleGuard(Roles.ADMIN))
  @UseGuards(JwtAuthGuard)
  @Get('')
  async getClientAuth(@Req() payload: any) {
    try {
      console.log('Token payload', payload.account)
      const res = await this.accountService.getAllAccounts()
      console.log('res', res)
      console.log('res', typeof res[0].id)

      return res
    } catch (error) {
      return error
    }
  }

  // @UseGuards(RoleGuard(Roles.ADMIN))
  // @ApiOperation({ summary: 'Get Email verify' })
  @UseGuards(JwtAuthGuard)
  @Get('verify-email')
  async verifyEmail(@Req() payload: any) {
    return await this.accountService.getVerifyEmailToken(payload.account.id)
  }

  // @ApiOperation({ summary: 'User gửi verify token' })
  @Get('verify-token')
  async verifyEmailToken(@Query('token') token: string) {
    const res = await this.accountService.verifyEmail(token)
    return res
  }
}
