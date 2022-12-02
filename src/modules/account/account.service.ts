import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { AuthService } from 'modules/auth/authentication.service'
import { SignupReq, SignupRes } from './dtos'
import { Utils } from 'utils/password'
import { response } from 'utils/helper'
import { MailService } from 'modules/mail/mail.service'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserEntity, UserProfile } from 'entity'

@Injectable()
export class AccountService {
  constructor(
    private readonly authService: AuthService,
    private readonly mailService: MailService,
    @InjectRepository(UserEntity) private readonly userEntity: Repository<UserEntity>,
    @InjectRepository(UserProfile) private readonly profileEntity: Repository<UserProfile>
  ) {}

  async createAccount(account: SignupReq): Promise<SignupRes> {
    try {
      const accountInfo = await this.userEntity.findOneBy({
        email: account.email
      })
      if (accountInfo) throw new HttpException('Email is already exist', HttpStatus.BAD_REQUEST)

      const hashPassword = Utils.hashPassword(account.password)

      const newAccount = this.userEntity.create({
        email: account.email,
        password: hashPassword
      })

      newAccount.profile = this.profileEntity.create()

      await this.userEntity.save(newAccount)

      return {
        id: newAccount.id,
        email: newAccount.email,
        isVerify: newAccount.isVerify,
        role: newAccount.role
      }
    } catch (error) {
      throw error
    }
  }

  async loginService(account: any) {
    try {
      const accountInfo = await this.userEntity.findOneBy({ email: account.email })

      if (!accountInfo) return 'Account not found'

      const isMatch = Utils.comparePassword(account?.password, accountInfo?.password)
      if (!isMatch) return 'Password is not correct'

      return await this.authService.createToken({ email: accountInfo.email, id: accountInfo.id })
    } catch (error) {
      throw error
    }
  }

  async verifyEmail(token: string) {
    const payload = await this.authService.verifyToken(token)

    console.log('verify token payload', payload)

    const accountInfo = await this.userEntity.findOneBy({ id: payload.id })

    if (!accountInfo) throw new HttpException('Account not found', HttpStatus.BAD_REQUEST)

    if (accountInfo.isVerify) throw new HttpException('Email is already verify', HttpStatus.BAD_REQUEST)

    await this.userEntity.update(payload.id, { isVerify: true })

    return response('Email is verified')
  }

  async getVerifyEmailToken(id: number) {
    const accountInfo = await this.userEntity.findOneBy({ id })
    const token = await this.authService.createToken({ id })

    if (!accountInfo) throw new HttpException('Account not found', HttpStatus.BAD_REQUEST)

    if (accountInfo.isVerify) throw new HttpException('Email is already verify', HttpStatus.BAD_REQUEST)

    await this.mailService.sendMail({
      from: 'jigracing@gmail.com<noreply@jigracing@gmail.com>',
      to: accountInfo.email,
      subject: 'Verify email',
      html: `<a href="http://localhost:4000/api/auth/verify-token?token=${token}">Click here to verify email</a>`
    })
    return response('Email is sent')
  }

  async getAllAccounts() {
    return await this.userEntity.find()
  }
}
