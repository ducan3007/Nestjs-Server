import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Account, AccountDocument } from 'schemas/account.schema';
import { AuthService } from 'modules/auth/auth.service';
import { Utils } from 'utils/utils';
import { response } from 'utils/helper';
@Injectable()
export class AccountService {
  constructor(
    @InjectModel(Account.name) private accountModel: Model<AccountDocument>,

    private readonly authService: AuthService,
  ) {}

  async createAccount(account: Account) {
    const accountInfo = await this.accountModel.findOne({
      email: account.email,
    });
    if (accountInfo)
      throw new HttpException('Email is already exist', HttpStatus.BAD_REQUEST);

    const hashPassword = Utils.hashPassword(account.password);

    const newAccount = {
      username: account.username,
      email: account.email,
      password: hashPassword,
    };

    await new this.accountModel(newAccount).save();

    return response(newAccount);
  }

  async loginService(account: any) {
    try {
      const accountInfo = await this.accountModel.findOne({
        username: account.username,
      });

      if (!accountInfo) return 'Account not found';

      const isMatch = Utils.comparePassword(
        account?.password,
        accountInfo?.password,
      );
      if (!isMatch) return 'Password is not correct';

      return await this.authService.createToken(
        { username: accountInfo.username, id: accountInfo._id },
        '10m',
      );
    } catch (error) {
      throw error;
    }
  }

  async getAllAccounts() {
    return this.accountModel.find();
  }
}
