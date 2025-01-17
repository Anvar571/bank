import express, { Application } from "express";
import ConfigService from "./shared/config/config";
import { LoggerService } from "./infra/logging/logger.service";
import { LoggingConfiguration } from "./infra/logging/logging.config";
import { DatabaseService } from "./infra/db/db.service";
import { ErrorHandler } from "./shared/errors/error.handler";
import { errorMiddleware } from "./shared/errors/error.middleware";

export function startServer() {
    LoggingConfiguration.configure({
        enableConsole: false,
        enableFile: true,
        enableDatabase: false,
        logDir: 'logs',
        db: new DatabaseService()
    });

    const logger = LoggerService.getInstance();
    const errorHandler = ErrorHandler.getInstance();

    process.on('uncaughtException', (error) => {
        errorHandler.handleError(error);
        process.exit(1);
    });

    process.on('unhandledRejection', (error: Error) => {
        errorHandler.handleError(error);
        process.exit(1);
    });

    try {
        const app: Application = express();
        const configService = ConfigService.getInstance();
        const config = configService.getConfig();

        // Middleware
        app.use(express.urlencoded({extended: true}));
        app.use(express.json());
        app.use(errorMiddleware);

        // Routes
        // tekshirish kerak async holat bilan async siz holatni farqlarini
        // kiyin workerlar bilan ishlarib ham tekshirish kerak 
        // loglarni workergami yoki boshqa narsaga olib o'tish kerak
        app.get("/", async (_, res) => {
            res.send({ message: "Hello world"});
        });

        const PORT: number = config.server.port;

        app.listen(PORT, (error) => {
            logger.info(`Server running on ${PORT} port`);
        });
    } catch (error) {
        if (error instanceof Error) {
            logger.error("Failed to start server: ", {error: error.message});
        } else {
            logger.error("Failed to start server: ", {error});
        }
    }
}

startServer();
