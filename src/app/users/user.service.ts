import { UserRepository } from "./user.repository";
import { CreateUser, UserReturnData } from "./user.types";

export class UserService implements UserRepository {
    async register(userModel: CreateUser): Promise<UserReturnData> {
        return Promise.resolve({ id: 1 });
    };
}
