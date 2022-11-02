import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  ValidateNested,
  ArrayNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Match } from 'common/decorator/match.decorator';

class Contact {
  @IsNotEmpty()
  @IsNumber()
  phone: number;

  @IsNotEmpty()
  address: string;
}
export class SignupReq {
  @IsNotEmpty({
    message: 'Email is required',
  })
  @IsEmail({
    message: 'Email is not valid',
  })
  email: string;

  @IsNotEmpty({
    message: 'Username is required',
  })
  username: string;

  @IsNotEmpty({
    message: 'Password is required',
  })
  password: string;

  @Match('password', {
    message: 'Password does not match',
  })
  @IsNotEmpty({
    message: 'Confirm password is required',
  })
  @Match('password', {
    message: 'Confirm password does not match',
  })
  passwordConfirm: string;

  @ArrayNotEmpty({
    message: 'Contact_1 is required',
  })
  @Type(() => Contact)
  @ValidateNested({ each: true })
  contact_1: Contact[];

  @IsNotEmpty({
    message: 'Contact_2 is required',
  })
  @Type(() => Contact)
  @ValidateNested()
  contact_2: Contact;
}
