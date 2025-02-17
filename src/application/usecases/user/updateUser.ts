import { UserService } from '../../../domain/user/user.types';
import { BaseUseCase } from '../core';

type UpdateBalanceUserParams = {};

type UpdateBalanceUserResponse = null;

export interface UpdateBalanceUserUseCase
  extends BaseUseCase<UpdateBalanceUserParams, UpdateBalanceUserResponse> {
  exucate(params: UpdateBalanceUserParams): Promise<UpdateBalanceUserResponse>;
}

export class UpdateBalanceUser implements UpdateBalanceUserUseCase {
  constructor(private userService: UserService) {}

  exucate(params: UpdateBalanceUserParams): Promise<UpdateBalanceUserResponse> {
    return Promise.resolve(null);
  }
}
