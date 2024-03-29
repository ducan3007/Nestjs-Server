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
import { Message } from './message.entity'

@Entity({ name: 'conversation' })
export class Conversation {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  create_user: number

  @Column()
  receive_user: number

  @OneToMany(() => Message, (message) => message.conversation, { cascade: true })
  @JoinColumn()
  messages: Message[]

  @OneToOne(() => Message, (message) => message.id)
  @JoinColumn({ name: 'last_message_id' })
  last_message: Message

  @CreateDateColumn({ name: 'created_at' })
  createdAt: number

  @UpdateDateColumn({
    type: 'timestamptz',
    name: 'updated_at'
  })
  last_message_at: Date
}
