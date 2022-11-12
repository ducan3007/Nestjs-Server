import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './auth.service';

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
      // default property is user
      property: 'account',
      session: false,
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  providers: [PassportModule, JwtStrategy, AuthService],
  exports: [PassportModule, AuthService],
})
export class AuthenticationModule {}
