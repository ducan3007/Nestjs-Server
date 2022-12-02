import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { CommonMessage } from './common'
import { MessageAttachment } from './message_attachment.entity'

@Entity({ name: 'message' })
export class Message extends CommonMessage {
  @OneToMany(() => MessageAttachment, (attachment) => attachment.message)
  @JoinColumn()
  attachments: MessageAttachment[]
}
