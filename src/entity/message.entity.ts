import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { CommonMessage } from './common'
import { MessageAttachment } from './message_attachment.entity'
import { Conversation } from './conversation.entity'

@Entity({ name: 'message' })
export class Message extends CommonMessage {
  @ManyToOne(() => Conversation, (conversation) => conversation.messages)
  @JoinColumn({ name: 'conversation_id' })
  conversation: Conversation

  @OneToMany(() => MessageAttachment, (attachment) => attachment.message)
  @JoinColumn()
  attachments: MessageAttachment[]
}
