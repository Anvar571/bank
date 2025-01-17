import { CreateUser, UserReturnData } from "./user.types";

export interface UserRepository {
    register: (userModel: CreateUser) => Promise<UserReturnData>;
}
