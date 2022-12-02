import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { UserProfileController } from './user-profile.controller'
import { UserService } from './user.service'
import { AuthenticationModule } from 'modules/auth/authentication.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import UserEntity from 'entity/user.entity'
import { UserProfile } from 'entity/userProfile.entity'

@Module({
  imports: [AuthenticationModule, TypeOrmModule.forFeature([UserEntity, UserProfile])],
  controllers: [UserController, UserProfileController],
  providers: [UserService],
  exports: []
})
export class UserModule {}
