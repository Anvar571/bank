import { Router } from "express";
import { UserController } from "../controllers/users.controller";

export class UserRoute {
    public path: string;
    public router: Router;
    private userController = new UserController();

    constructor(path?: string) {
        this.path = path || "users";
        this.router = Router();
        this.initialaze();
    }

    private initialaze() {
        this.router.get(`/${this.path}`, this.userController.findAllUsers.bind(this.userController))
    }
}
