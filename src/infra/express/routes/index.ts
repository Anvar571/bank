import { Router } from "express";
import { UserRoute } from "./users.route";

export const mainRouter = Router();

mainRouter.use("/users", UserRoute);
