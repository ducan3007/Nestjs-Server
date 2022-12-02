import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm'
import { Message } from './message.entity'

@Entity({ name: 'message_attachment' })
export class MessageAttachment {
  @PrimaryColumn()
  file_id: string

  @Column()
  type: string

  @Column({
    nullable: true
  })
  url: string

  @ManyToOne(() => Message, (message) => message.attachments)
  message: Message
}
