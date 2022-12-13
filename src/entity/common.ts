import { Column, CreateDateColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { UserEntity } from 'entity/user.entity'

export class CommonTimeStamp {
  @CreateDateColumn({
    type: 'timestamptz',
    name: 'created_at'
  })
  createdAt: Date

  @UpdateDateColumn({
    type: 'timestamptz',
    name: 'updated_at'
  })
  updatedAt: Date
}

export class CommonMessage {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => UserEntity, (user) => user.messages)
  user: UserEntity

  @Column('text', { nullable: true })
  content: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: number
}
