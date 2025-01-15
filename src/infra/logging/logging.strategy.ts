export enum LogLevel {
    ERROR = "ERROR",
    WARN = "WARN",
    INFO = "INFO",
}

export interface LogContext {
    timestamp: string;
    level: LogLevel,
    message: string;
    meta?: object;
}

export interface LoggingStrategy {
    log(context: LogContext): void;
}