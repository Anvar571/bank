import { HashStrategy } from "../services/hash.service";
import { UserDto, UserModel, UserResponse } from "./user.types";
import { User } from "./users";

export interface UserRepository {
    create: (userModel: UserDto) => Promise<UserResponse>;
    validationPassword: (password: string) => Promise<void>;
    hashPassword: (password: HashStrategy) => Promise<HashStrategy>;
    findByPassword: (passport_number: Pick<UserModel, "passport_number">) => Promise<User | undefined>;
    findByItem: (user: Partial<UserDto>) => Promise<User | undefined>;
}

