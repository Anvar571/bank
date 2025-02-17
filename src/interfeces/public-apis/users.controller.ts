import { NextFunction, Response, Request } from 'express';
import { HashService } from '../../application/service/hash.service';
import { UserServiceImpl } from '../../domain/user/service/user.service';
import { UserRepositoryImpl } from '../../infrastructure/db/user/user.repository';

export class UserController {
  private userRepo = UserRepositoryImpl.getInstance();
  private hashService = new HashService();
  private userService = new UserServiceImpl(this.userRepo, this.hashService);

  constructor() {}

  async findAllUsers(req: Request, res: Response, next: NextFunction) {
    const result = await this.userService.findAllUsers();
    res.send(result);
  }
}
