import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Account, AccountDocument } from 'schemas/account.schema';
import { Utils } from 'utils/utils';

@Injectable()
export class AccountService {
  constructor(
    @InjectModel(Account.name) private accountModel: Model<AccountDocument>,
  ) {}

  async createAccount(account: Account) {
    const createdAccount = new this.accountModel(account);
    return createdAccount.save();
  }

  async findAccountById(id: Account) {
    const account = await this.accountModel.findById(id);

    if (!account) {
      return null;
    }
    return account;
  }
}
