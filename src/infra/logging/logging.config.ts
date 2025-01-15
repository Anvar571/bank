import { DatabaseService } from "../db/db.service";
import { ConsoleLoggingStrategy } from "./console.strategy";
import { FileLoggingStrategy } from "./file.strategy";
import { LoggerService } from "./logger.service";

export class LoggingConfiguration {
    static configure(options: {
        enableConsole?: boolean;
        enableFile?: boolean;
        enableDatabase?: boolean;
        logDir?: string;
        db?: DatabaseService;
    }): void {
        const logger = LoggerService.getInstance();
        logger.clearStrategies();

        if (options.enableConsole) {
            logger.addStrategy(new ConsoleLoggingStrategy());
        }

        if (options.enableFile) {
            logger.addStrategy(new FileLoggingStrategy(options.logDir));
        }
    }
}