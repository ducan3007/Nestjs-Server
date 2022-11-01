import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AccountDocument = Account & Document;

@Schema({
  collection: 'accounts',
})
export class Account {
  @Prop({ required: true, maxlength: 50 })
  username: string;

  @Prop({ required: true, unique: true, maxlength: 50 })
  email: string;

  @Prop({ required: true, maxlength: 50 })
  password: string;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
