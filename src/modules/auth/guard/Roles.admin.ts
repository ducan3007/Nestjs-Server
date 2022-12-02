import { CanActivate, ExecutionContext, Type, mixin } from '@nestjs/common'
import { UnauthorizedException } from '@nestjs/common'
import { Roles } from 'common/interfaces'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserEntity } from 'entity/user.entity'

const RoleGuard = (role: Roles): Type<CanActivate> => {
  class MixinGuard implements CanActivate {
    constructor(@InjectRepository(UserEntity) private userEntity: Repository<UserEntity>) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
      const req = context.switchToHttp().getRequest()
      const account = await this.userEntity.findOneBy({
        id: req['account']['id']
      })
      if (account?.role === role) return true
      throw new UnauthorizedException('Bạn không có quyền')
    }
  }
  return mixin(MixinGuard)
}

export default RoleGuard
