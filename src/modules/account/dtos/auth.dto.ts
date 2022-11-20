import { IsEmail, IsNotEmpty, IsNumber, ValidateNested, ArrayNotEmpty, IsObject, IsOptional } from 'class-validator'
import { Type } from 'class-transformer'
import { Match } from 'common/decorator/match.decorator'

class Contact {
  @IsNotEmpty()
  @IsNumber()
  phone: number

  @IsNotEmpty()
  address: string
}
export class SignupReq {
  @IsNotEmpty({
    message: 'Email is required'
  })
  @IsEmail({
    message: 'Email is not valid'
  })
  email: string

  @IsNotEmpty({
    message: 'Username is required'
  })
  username: string

  @IsNotEmpty({
    message: 'Password is required'
  })
  password: string

  @Match('password', {
    message: 'Password does not match'
  })
  @IsNotEmpty({
    message: 'Confirm password is required'
  })
  @Match('password', {
    message: 'Confirm password does not match'
  })
  confirmPassword: string

  @IsOptional()
  @ArrayNotEmpty({
    message: 'contact_array is required'
  })
  @Type(() => Contact)
  @ValidateNested({ each: true })
  contact_array: Contact[]

  @IsOptional()
  @IsNotEmpty({
    message: 'contact_object is required'
  })
  @IsObject()
  @Type(() => Contact)
  @ValidateNested()
  contact_object: Contact
}

export class SignupRes {
  username: string
  email: string
  id: string
}

export class LoginReq {
  @IsNotEmpty({
    message: 'Username is required'
  })
  email: string

  @IsNotEmpty({
    message: 'Password is required'
  })
  password: string
}
