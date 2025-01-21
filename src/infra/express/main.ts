import express, { Application } from "express";
import { LoggerService } from "../logging/logger.service";

export class ExpressApp {
    private static instance: ExpressApp;
    private readonly app: Application;
    private readonly loggingService: LoggerService;

    private constructor() {
        this.app = express();
        this.loggingService = LoggerService.getInstance();
    }

    public static getInstance(): ExpressApp {
        if (!ExpressApp.instance) {
            ExpressApp.instance = new ExpressApp();
        }
        return ExpressApp.instance;
    }

    private middlewares() {
        this.app.use(express.urlencoded({extended: true}));
        this.app.use(express.json());

        // Routes
        // tekshirish kerak async holat bilan async siz holatni farqlarini
        // kiyin workerlar bilan ishlarib ham tekshirish kerak 
        // loglarni workergami yoki boshqa narsaga olib o'tish kerak
        this.app.get("/", async (_, res) => {
            res.send({ message: "Hello world"});
        });
    }

    public start(PORT: number) {
        this.app.listen(PORT, ()=>{
            this.loggingService.info(`Server running on ${PORT} port`);
        });
    }
}