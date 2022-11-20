import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { Account, AccountDocument } from 'schemas/account.schema'

import { AuthService } from 'modules/auth/auth.service'
import { SignupReq } from './dtos'
import { Utils } from 'utils/utils'
import { response } from 'utils/helper'
import { MailService } from 'modules/mail/mail.service'
@Injectable()
export class AccountService {
  constructor(
    @InjectModel(Account.name) private accountModel: Model<AccountDocument>,
    @Inject(AuthService) private readonly authService: AuthService,
    @Inject(MailService) private readonly mailService: MailService
  ) {}

  async createAccount(account: SignupReq) {
    const accountInfo = await this.accountModel.findOne({
      email: account.email
    })
    if (accountInfo) throw new HttpException('Email is already exist', HttpStatus.BAD_REQUEST)

    const hashPassword = Utils.hashPassword(account.password)

    const newAccount = {
      username: account.username,
      email: account.email,
      password: hashPassword
    }

    await new this.accountModel(newAccount).save()

    return response(newAccount)
  }

  async loginService(account: any) {
    try {
      const accountInfo = await this.accountModel.findOne({
        email: account.email
      })

      if (!accountInfo) return 'Account not found'

      const isMatch = Utils.comparePassword(account?.password, accountInfo?.password)
      if (!isMatch) return 'Password is not correct'

      return await this.authService.createToken({ username: accountInfo.username, id: accountInfo._id }, '10m')
    } catch (error) {
      throw error
    }
  }

  async verifyEmail(token: string) {
    const payload = await this.authService.verifyToken(token)

    console.log('verify token payload', payload)

    const accountInfo = await this.accountModel.findOne({ _id: payload.id })

    if (!accountInfo) throw new HttpException('Account not found', HttpStatus.BAD_REQUEST)

    if (accountInfo.isVerified) throw new HttpException('Email is already verify', HttpStatus.BAD_REQUEST)

    await this.accountModel.updateOne({ _id: payload.id }, { isVerified: true })
    return response('Email is verified')
  }

  async getVerifyEmailToken(id: string) {
    const token = await this.authService.createToken({ id }, '10m')
    const accountInfo = await this.accountModel.findOne({ _id: id })

    await this.mailService.sendMail({
      from: 'jigracing@gmail.com<noreply@jigracing@gmail.com>',
      to: accountInfo.email,
      subject: 'Verify email',
      html: `<a href="http://localhost:4000/api/auth/verify-token?token=${token}">Click here to verify email</a>`
    })
    return response('Email is sent')
  }

  async getAllAccounts() {
    return await this.accountModel.find()
  }
}
