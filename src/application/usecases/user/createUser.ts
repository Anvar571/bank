import { BaseUseCase } from '../core';

type CreateUserUseCaseParams = {};

type CreateUserUseCaseResponse = {};

export interface CreateUserUseCase
  extends BaseUseCase<CreateUserUseCaseParams, CreateUserUseCaseResponse> {}

export class CreateUser implements CreateUserUseCase {
  constructor() {}

  exucate(input: CreateUserUseCaseParams): Promise<CreateUserUseCaseResponse> {
    return Promise.resolve({});
  }
}
