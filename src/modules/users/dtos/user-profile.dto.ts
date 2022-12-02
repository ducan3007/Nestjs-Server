import { IsEmail, IsNotEmpty, IsNumber, ValidateNested, ArrayNotEmpty, IsObject, IsOptional } from 'class-validator'
import { Type } from 'class-transformer'
import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger'
import { UserProfile } from 'entity/userProfile.entity'

export class UserProfileUpdate extends UserProfile {
  @ApiProperty({
    required: false
  })
  @IsNotEmpty()
  firstName: string

  @ApiProperty({
    required: false
  })
  @IsNotEmpty()
  lastName: string

  @ApiProperty({
    required: false
  })
  @IsOptional()
  avatar1: string

  @ApiProperty({
    required: false
  })
  @IsOptional()
  phone: string

  @ApiProperty({
    required: false
  })
  @IsOptional()
  city: string

  @ApiProperty({
    required: false
  })
  @IsOptional()
  country: string
}
