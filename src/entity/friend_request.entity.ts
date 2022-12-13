import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany
} from 'typeorm'

@Entity({ name: 'friend_request' })
export class FriendRequest {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  create_user: number

  @Column()
  receive_user: number

  @CreateDateColumn({ name: 'created_at' })
  createdAt: number

  @UpdateDateColumn({
    type: 'timestamptz',
    name: 'updated_at'
  })
  last_message_at: Date
}
