import { BaseUseCase } from '../core';

type CreateCardParams = {
  username: string;
  password_id: string;
  phone_number: number;
  address: string;
};

type CreateCardResponse = {};

export interface CreatedCardUseCase
  extends BaseUseCase<CreateCardParams, CreateCardResponse> {}

export class CreateCard implements CreatedCardUseCase {
  exucate(input: CreateCardParams): Promise<CreateCardResponse> {
    return Promise.resolve({});
  }
}
