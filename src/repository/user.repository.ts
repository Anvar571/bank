import { UserDto, UserResponse, UserModel } from '../models/user.types';
import { User } from '../users/users';

export interface UserRepository {
  create: (userModel: UserDto) => Promise<UserResponse>;
  findByPassword: (
    passport_number: Pick<UserModel, 'passport_number'>,
  ) => Promise<User | undefined>;
  findByItem: (user: Partial<UserDto>) => Promise<User | undefined>;
  findAllUsers: () => Promise<User[]>;
}
