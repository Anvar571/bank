import ConfigService from "./shared/config/config";
import { LoggerService } from "./infra/logging/logger.service";
import { LoggingConfiguration } from "./infra/logging/logging.config";
import { DatabaseService } from "./infra/db/db.service";
import { ErrorHandler } from "./shared/errors/error.handler";
import { ExpressApp } from "./infra/express/main";

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
        const configService = ConfigService.getInstance();
        const config = configService.getConfig();
        const application = ExpressApp.getInstance();

        const PORT: number = config.server.port;
        application.start(PORT);
    } catch (error) {
        if (error instanceof Error) {
            logger.error("Failed to start server: ", {error: error.message});
        } else {
            logger.error("Failed to start server: ", {error});
        }
    }
}

startServer();
