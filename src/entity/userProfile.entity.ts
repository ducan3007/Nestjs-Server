import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { CommonTimeStamp } from './common'
import { UserEntity } from './user.entity'

@Entity({
  name: 'user_profile'
})
export class UserProfile extends CommonTimeStamp {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    nullable: true,
    length: 50,
    default: ''
  })
  firstName: string

  @Column({
    nullable: true,
    length: 50,
    default: ''
  })
  lastName: string

  @Column({
    default: 'https://avatars.githubusercontent.com/u/58422724?v=4'
  })
  avatar: string

  @Column({
    nullable: true
  })
  phone: string

  @Column({
    nullable: true
  })
  city: string

  @Column({
    nullable: true
  })
  country: string

  @OneToOne(() => UserEntity)
  user: UserEntity
}
