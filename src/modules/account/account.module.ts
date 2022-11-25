import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from 'postgres/user.entity'

import { MailModule } from 'modules/mail/mail.module'
import { AuthenticationModule } from 'modules/auth/auth.module'

import { AccountService } from './account.service'
import { AccountController } from './account.controller'
import { Account, AccountSchema } from 'schemas/account.schema'
@Module({
  imports: [
    AuthenticationModule,
    MongooseModule.forFeature([{ name: Account.name, schema: AccountSchema }]),
    TypeOrmModule.forFeature([UserEntity]),
    MailModule
  ],
  controllers: [AccountController],
  providers: [AccountService],
  exports: []
})
export class AccountModule {}
