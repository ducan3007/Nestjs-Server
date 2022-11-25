import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { CommonSchema } from './common/id.common'
export type AccountDocument = Account & Document

@Schema({
  collection: 'accounts',
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      delete ret.__v
      delete ret.password
      ret.id = ret._id
      delete ret._id
    }
  }
})
export class Account extends CommonSchema {
  @Prop({ required: false, maxlength: 50 })
  username: string

  @Prop({ required: true, unique: false, maxlength: 50 })
  email: string

  @Prop({ required: true })
  password: string

  @Prop({ default: false })
  isVerified: boolean

  @Prop({ default: false })
  active: boolean

  @Prop({ default: 'user' })
  role: string
}

export const AccountSchema = SchemaFactory.createForClass(Account)
