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
    const hashPassword = Utils.hashPassword(account.password);

    const newAccount = new this.accountModel({
      username: account.username,
      email: account.email,
      password: hashPassword,
    });
    return newAccount.save();
  }

  async findAccountById(id: Account) {
    const account = await this.accountModel.findById(id);

    if (!account) {
      return null;
    }
    return account;
  }

  async getAllAccounts() {
    return this.accountModel.find();
  }
}
