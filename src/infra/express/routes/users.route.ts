import { Router, Request, Response } from "express";
import { HashService } from "../../../app/services/hash.service";
import { UserServiceImpl } from "../../../app/users/user.service";
import { UserRepositoryImpl } from "../../db/db.service";

export const UserRoute = Router();

UserRoute.get("/", async (req: Request, res: Response) => {
    const userRepo = UserRepositoryImpl.getInstance();
    const hashService = new HashService();
    const userService = new UserServiceImpl(userRepo, hashService);
    const result = await userService.findAllUsers();
    const result1 = await userService.findById("username");

    console.log(result1, "natija");

    res.send(result);
});

UserRoute.get("/:id", async (req: Request, res: Response) => {
    const userRepo = UserRepositoryImpl.getInstance();
    const hashService = new HashService();
    const userService = new UserServiceImpl(userRepo, hashService);
    const result = await userService.findById("username");
    console.log(result, "Res");
    
    res.send(result);
})

