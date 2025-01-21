import { UserRepository } from "../../app/users/user.repository";
import { UserDto, UserModel, UserResponse, UserType } from "../../app/users/user.types";
import { User } from "../../app/users/users";

export class UserRepositoryImpl implements UserRepository {
    private static instance: UserRepositoryImpl;

    private users: User[] = [];

    private constructor() {}

    public static getInstance() {
        if (!UserRepositoryImpl.instance) {
            UserRepositoryImpl.instance = new UserRepositoryImpl();
        }
        return UserRepositoryImpl.instance;
    }

    public async create(userModel: UserDto): Promise<UserResponse> {
        const newUser = new User({
            id: 1,
            balance: 0,
            jshir: userModel.jshir,
            passport_number: userModel.passport_number,
            phone: userModel.phone,
            type: UserType.INDIVIDUALS,
            username: userModel.username,
            created_at: new Date(),
            updated_at: new Date(),
        });
        this.users.push(newUser);
        return {
            id: newUser.id,
            created_at: newUser.created_at,
        }
    };
    
    public async findByPassword({passport_number}: Pick<UserModel, "passport_number">): Promise<User | undefined> {
        return this.users.find((val) => val.passport_number == passport_number);
    };

    public async findByItem(user: Partial<UserModel>): Promise<User | undefined> {
        return this.users.find((u) =>
            Object.entries(user).every(([key, value]) => u[key as keyof UserModel] === value)
        );
    };

    public async findAllUsers(): Promise<User[]> {
        const newUser = new User({
            id: 1,
            balance: 0,
            jshir: "userModel.jshir",
            passport_number: "userModel.passport_number",
            phone: 938334341,
            type: UserType.INDIVIDUALS,
            username: "username",
            created_at: new Date(),
            updated_at: new Date(),
        });
        this.users.push(newUser, newUser);
        return this.users;
    }
}
