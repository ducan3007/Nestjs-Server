import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { CommonTimeStamp } from './common'

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
    nullable: true,
    length: 50
  })
  firstName: string

  @Column({
    nullable: true,
    length: 50
  })
  lastName: string

  @Column({
    default: 'user'
  })
  role: string

  @Column({
    default: 'https://avatars.githubusercontent.com/u/58422724?v=4'
  })
  avatar: string

  @Column()
  phone: string
}

export default UserEntity
