import { User } from './users';

export enum UserType {
  INDIVIDUALS = 'individuals',
}

export interface UserModel {
  id: number;
  username: string;
  jshir: string;
  passport_number: string;
  balance: number;
  phone: number;
  type: UserType;
  created_at: Date;
  updated_at: Date;
}

export interface UserDto {
  username: string;
  jshir: string;
  passport_number: string;
  phone: number;
}

// Error types
export interface UserError {
  code: 'USER_EXISTS' | 'INTERNAL_ERROR';
  message: string;
}

// Success response type
export interface UserResponse {
  id: number;
  created_at: Date;
}

export interface UserService {
  create: (user: UserDto) => Promise<UserResponse | UserError>;
  findAllUsers: () => Promise<User[] | []>;
  findById: (username: string) => Promise<User | undefined>;
  update: (user: User) => Promise<User | undefined>;
}
