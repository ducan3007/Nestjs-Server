import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from 'entity/user.entity'
import { UserProfile } from 'entity/userProfile.entity'
import { Repository } from 'typeorm'
import { UserNotFound } from './exceptions'
import { UserProfileUpdate } from './dtos/user-profile.dto'
import { DataSource } from 'typeorm'
@Injectable()
export class UserService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(UserProfile) private profileRepository: Repository<UserProfile>,
    @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>
  ) {}

  async createUser(user: Partial<UserEntity>): Promise<any> {}

  async getUserProfile(id: number): Promise<any> {}

  async updateUserProfile(authUser: UserEntity, profile: UserProfileUpdate): Promise<UserEntity> {
    try {
      const user = await this.getUser(authUser.id)
      user.profile = { ...user.profile, ...profile }
      await this.userRepository.save(user)
      return user
    } catch (error) {
      throw error
    }
  }

  async getUser(id: number): Promise<UserEntity> {
    console.log(
      'query',
      this.userRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.profile', 'user_profile')
        .select(['user.id', 'user.email', 'user.isVerify', 'user_profile.firstName', 'user_profile.lastName'])
        .where('user.id = :id', { id })
        .getSql()
    )

    // This option exe a raw query
    const abc = await this.dataSource.query(
      'SELECT * from "users" LEFT JOIN "user_profile" on "user_profile"."id" = "users"."profileId" where users.id = $1',
      [id]
    )

    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.profile', 'user_profile')
      .select(['user.id', 'user.email', 'user.isVerify', 'user.role', 'user_profile'])
      .where('user.id = :id', { id })
      .getOne()

    // getOne() will return a UserEntity object
    // getRawOne() will return a plain object
    // execute() will execute the SQL return by getSql() method

    const flattenUser = await this.dataSource
      .createQueryBuilder()
      .select([
        'user.id as id',
        'user.email as email',
        'user.isVerify as isVerify',
        'user_profile.firstName as firstName',
        'user_profile.lastName as lastName'
      ])
      .from(UserEntity, 'user')
      .leftJoin('user.profile', 'user_profile')
      .where('user.id = :id', { id })
      .execute()

    const useFind = await this.userRepository.find({
      relations: { profile: true },
      where: { id },
      select: ['id', 'email', 'isVerify', 'profile']
      // cache: {  id: `user-${id}`,   milliseconds: 1000 * 60 * 60 * 24  }
    })

    console.log('Raw Query', abc)
    console.log('User Profile', user)
    console.log('Flat User', flattenUser)
    console.log('User Find', useFind)
    if (!user) throw new UserNotFound()
    return user
  }
  async getUserById(id: number): Promise<UserEntity> {
    const userProfile = await this.getUser(id)
    if (!userProfile) throw new UserNotFound()
    return userProfile
  }
}
