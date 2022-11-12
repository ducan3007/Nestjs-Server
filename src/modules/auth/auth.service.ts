import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Utils } from 'utils';
import { Config } from 'apollo-server-express';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async createToken(payload: any, expire: any) {
    return this.jwtService.signAsync(payload, {
      expiresIn: expire,
      secret: this.configService.get('JWT_SECRET'),
    });
  }
}
