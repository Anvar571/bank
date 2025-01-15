import { LogContext, LoggingStrategy, LogLevel } from "./logging.strategy";

export class ConsoleLoggingStrategy implements LoggingStrategy {
    log(context: LogContext): void {
        const {message, level, meta} = context;
        const metaString = meta ? JSON.stringify(meta) : '';
        
        switch (level) {
            case 'ERROR':
                console.error(`${message} ${metaString}`);
                break;
            case 'WARN':
                console.warn(`${message} ${metaString}`);
                break;
            case 'INFO':
                console.info(`${message} ${metaString}`);
                break;
        }
    }
}