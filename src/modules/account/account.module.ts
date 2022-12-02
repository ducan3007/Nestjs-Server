import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from 'entity/user.entity'

import { MailModule } from 'modules/mail/mail.module'
import { AuthenticationModule } from 'modules/auth/authentication.module'

import { AccountService } from './account.service'
import { AccountController } from './account.controller'
import { UserProfile } from 'entity/userProfile.entity'
@Module({
  imports: [
    AuthenticationModule,
    // MongooseModule.forFeature([{ name: Account.name, schema: AccountSchema }]),
    TypeOrmModule.forFeature([UserEntity, UserProfile]),
    MailModule
  ],
  controllers: [AccountController],
  providers: [AccountService],
  exports: []
})
export class AccountModule {}
