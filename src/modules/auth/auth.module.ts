import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
@Module({
   imports: [ConfigModule, PassportModule, JwtModule.register({})],
   providers: [PassportModule, JwtStrategy],
})
export class AuthenticationModule {}
