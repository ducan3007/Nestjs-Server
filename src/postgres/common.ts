import { CreateDateColumn, UpdateDateColumn } from 'typeorm'

export class CommonTimeStamp {
  @CreateDateColumn({
    type: 'timestamptz'
  })
  createdAt: Date

  @UpdateDateColumn({
    type: 'timestamptz'
  })
  updatedAt: Date
}
