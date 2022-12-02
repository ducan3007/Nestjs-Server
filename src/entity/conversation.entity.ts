import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'conversation' })
export class Conversation {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn({ name: 'created_at' })
  createdAt: number

  @CreateDateColumn({ name: 'update_at' })
  last_message_at: number
}
