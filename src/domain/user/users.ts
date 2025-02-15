import { BaseClass } from '../../domain/core/base';
import { UserModel } from './user.types';

export class User extends BaseClass<UserModel> implements UserModel {
  constructor(userModel: UserModel) {
    super(userModel);
  }

  public get id() {
    return this.data.id;
  }

  public get username() {
    return this.data.username;
  }

  public get jshir() {
    return this.data.jshir;
  }

  public get passport_number() {
    return this.data.passport_number;
  }

  public get balance() {
    return this.data.balance;
  }

  public get phone() {
    return this.data.phone;
  }

  public get type() {
    return this.data.type;
  }

  public get created_at() {
    return this.data.created_at;
  }

  public get updated_at() {
    return this.data.updated_at;
  }
}
