import { HashService } from "../services/hash.service";
import { UserRepository } from "./user.repository";
import { UserDto, UserError, UserResponse, UserService } from "./user.types";
import { User } from "./users";

export class UserServiceImpl  implements UserService {
    private userRepository: UserRepository;
    private hashService: HashService;

    constructor(userRepository: UserRepository, hashService: HashService) {
        this.userRepository = userRepository;
        this.hashService = hashService;
    }

    public async getUser(user: Partial<UserDto>): Promise<User | undefined> {
        return this.userRepository.findByItem(user);
    }

    public async create(userData: UserDto): Promise<UserResponse | UserError> {
        const { passport_number, ...user} = userData;
        return new Promise<UserResponse>(async (resolve, reject: (error: UserError) => void) => {
            const existingUser = await this.userRepository.findByPassword({passport_number});
            
            if (existingUser) {
                reject({
                    code: 'USER_EXISTS',
                    message: 'Email already exists',
                });
                return;
            }

            const newUser = await this.userRepository.create({
                ...user,
                passport_number: await this.hashService.hash(passport_number),
            });

            resolve({
                id: newUser.id,
                created_at: newUser.created_at,
                role: newUser.role,
            });
        });
    }
}
