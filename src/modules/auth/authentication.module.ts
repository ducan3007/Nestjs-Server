import { Module, Global } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from './jwt.strategy'
import { AuthService } from './authentication.service'
import { ConfigService } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
      // Passport tự động thêm trường `user` và req nếu xác thực thành công
      property: 'account',
      session: false
    }),
    // Đăng ký module jwt
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.JWT_EXPIRES_IN
      }
    })
    // Đăng ký session module
  ],
  providers: [
    PassportModule,

    // JwtStrategy: giúp verify Token và về payload trong trường req.account
    JwtStrategy,

    // AuthService: Giúp controller login  tạo token, giúp JwtStrategy verify token
    AuthService
  ],
  exports: [PassportModule, AuthService]
})
export class AuthenticationModule {}
