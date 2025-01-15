import express, { Application, Request, Response } from "express";
import ConfigService from "./utils/config";
import { LoggerService } from "./infra/logging/logger.service";
import { LoggingConfiguration } from "./infra/logging/logging.config";
import { DatabaseService } from "./infra/db/db.service";

export function startServer() {
    LoggingConfiguration.configure({
        enableConsole: true,
        enableFile: true,
        enableDatabase: true,
        logDir: 'logs',
        db: new DatabaseService()
    });

    const logger = LoggerService.getInstance();
    try {
        const app: Application = express();
        const configService = ConfigService.getInstance();
        const config = configService.getConfig();
        const logging = LoggerService.getInstance();



        // Middleware
        app.use(express.urlencoded({extended: true}));
        app.use(express.json());

        // Routes

        // Error handling
        // app.use();

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
