import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { MailModule } from 'modules/mail/mail.module'
import { AuthenticationModule } from 'modules/auth/auth.module'

import { AccountService } from './account.service'
import { AccountController } from './account.controller'
import { Account, AccountSchema } from 'schemas/account.schema'
@Module({
  imports: [
    AuthenticationModule,
    MongooseModule.forFeature([{ name: Account.name, schema: AccountSchema }]),
    MailModule
  ],
  controllers: [AccountController],
  providers: [AccountService],
  exports: []
})
export class AccountModule {}
