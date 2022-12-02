import { Injectable } from '@nestjs/common'
import { Request } from 'express'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { ConfigService } from '@nestjs/config'
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly configService: ConfigService) {
    super({
      // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Lấy Token từ header
      jwtFromRequest: ExtractJwt.fromExtractors([
        // Extract token from cookie
        (request: Request) => {
          console.log('jwtFromRequest', request.cookies.Authentication)

          return request?.cookies?.Authentication
        }
      ]),
      secretOrKey: configService.get('JWT_SECRET')
    })
  }
  /**
   * @param payload là data lấy từ token ở trên
   * @returns Giá trị return sẽ được gán vào req.account. Ta có thể throw Error để hủy request
   */

  async validate(payload: any) {
    return payload
  }
}
