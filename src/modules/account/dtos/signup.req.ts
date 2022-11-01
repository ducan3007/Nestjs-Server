import { IsEmail, IsNotEmpty } from 'class-validator';
import { Match } from 'common/decorator/match.decorator';

class SignupReq {
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
  passwordConfirm: string;
}
