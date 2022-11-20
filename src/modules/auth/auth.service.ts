import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService, private configService: ConfigService) {}

  async createToken(payload: any, expire: any) {
    return this.jwtService.signAsync(payload, {
      expiresIn: expire,
      secret: this.configService.get('JWT_SECRET')
    })
  }

  async verifyToken(token: string) {
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get('JWT_SECRET')
      })

      return payload
    } catch (error) {
      throw new HttpException('Token is not valid', HttpStatus.BAD_REQUEST)
    }
  }
}
