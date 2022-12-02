import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { CommonTimeStamp } from './common'
import { Exclude } from 'class-transformer'
import { UserProfile } from './userProfile.entity'
import { Message } from './message.entity'

@Entity({
  name: 'users'
})
export class UserEntity extends CommonTimeStamp {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    nullable: false,
    length: 50
  })
  email: string

  @Column({
    nullable: false
  })
  password: string

  @Column({
    default: false
  })
  isVerify: boolean

  @Column({
    default: 'user'
  })
  role: string

  @OneToMany(() => Message, (message) => message.user)
  @JoinColumn()
  messages: Message[]

  // JoinColumn means:  UserEntiy hold the foreign key of UserProfile. This i uni-directional relationship
  @OneToOne(() => UserProfile, { cascade: ['insert', 'update'] })
  @JoinColumn()
  profile: UserProfile
}

export default UserEntity
