import express, { Application, Request, Response } from "express";
import { CONFIG } from "./config";

const app: Application = express();

app.get("/", (req: Request, res: Response) => {
    res.send({ message: "Hello world" });
})

app.use(express.urlencoded({extended: true}));

const PORT: number = CONFIG.server.PORT;

app.listen(PORT, (error) => {
    if (error) {
        console.log(error, "error");
    }
    console.log(`Server running on ${PORT} port`);
});