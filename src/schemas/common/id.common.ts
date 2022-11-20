import { Transform } from 'class-transformer'
import { ObjectId } from 'mongoose'

export class CommonSchema {
  @Transform(({ value }) => value.toString())
  _id: ObjectId
}
