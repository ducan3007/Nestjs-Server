import { IsEmail, IsNotEmpty, IsNumber, ValidateNested, ArrayNotEmpty, IsObject, IsOptional } from 'class-validator'
import { Type } from 'class-transformer'
import { Match } from 'common/decorator/match.decorator'
import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger'

class Contact {
  @ApiProperty({
    required: true
  })
  @IsNotEmpty()
  @IsNumber()
  phone: number

  @ApiProperty({
    required: true
  })
  @IsNotEmpty()
  address: string
}
export class SignupReq {
  @ApiProperty({
    required: true
  })
  @IsNotEmpty({
    message: 'Email is required'
  })
  @IsEmail({
    message: 'Email is not valid'
  })
  email: string

  @ApiProperty({
    required: false
  })
  username: string

  @ApiProperty({
    required: true
  })
  @IsNotEmpty({
    message: 'Password is required'
  })
  password: string

  @ApiProperty({
    required: true
  })
  @IsNotEmpty({
    message: 'Confirm password is required'
  })
  @Match('password', {
    message: 'Confirm password does not match'
  })
  confirmPassword: string

  @ApiProperty({
    required: false
  })
  @IsOptional()
  @ArrayNotEmpty({
    message: 'contact_array is required'
  })
  @Type(() => Contact)
  @ValidateNested({ each: true })
  contact_array: Contact[]

  @ApiProperty({
    required: false
  })
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
  @ApiResponseProperty()
  username: string
  email: string
  id: string
}

export class LoginReq {
  @ApiProperty({
    required: true
  })
  @IsNotEmpty({
    message: 'Username is required'
  })
  email: string

  @ApiProperty({
    required: true
  })
  @IsNotEmpty({
    message: 'Password is required'
  })
  password: string
}

export class LoginRes {
  token: string
}
