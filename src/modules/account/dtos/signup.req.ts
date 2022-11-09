import {
   IsEmail,
   IsNotEmpty,
   IsNumber,
   ValidateNested,
   ArrayNotEmpty,
   IsObject,
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
      message: 'contact_array is required',
   })
   @Type(() => Contact)
   @ValidateNested({ each: true })
   contact_array: Contact[];

   @IsNotEmpty({
      message: 'contact_object is required',
   })
   @IsObject()
   @Type(() => Contact)
   @ValidateNested()
   contact_object: Contact;
}
