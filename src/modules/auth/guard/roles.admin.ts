import { CanActivate, ExecutionContext, Type, mixin } from '@nestjs/common'
import { UnauthorizedException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Account, AccountDocument } from 'schemas/account.schema'
import { Roles } from 'common/interfaces'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserEntity } from 'postgres/user.entity'

const RoleGuard = (role: Roles): Type<CanActivate> => {
  class MixinGuard implements CanActivate {
    constructor(
      @InjectModel(Account.name) private accountModel: Model<AccountDocument>,
      @InjectRepository(UserEntity) private userEntity: Repository<UserEntity>
    ) {}

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
