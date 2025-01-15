import { LogContext, LoggingStrategy, LogLevel } from "./logging.strategy";

export class LoggerService {
    private static instance: LoggerService;
    private strategies: Set<LoggingStrategy> = new Set();

    private constructor() {}

    public static getInstance(): LoggerService {
        if (!LoggerService.instance) {
            LoggerService.instance = new LoggerService();
        }
        return LoggerService.instance;
    }

    public addStrategy(strategy: LoggingStrategy): void {
        this.strategies.add(strategy);
    }

    public removeStrategy(strategy: LoggingStrategy): void {
        this.strategies.delete(strategy);
    }

    public clearStrategies() {
        this.strategies.clear();
    }

    private createLogContext(level: LogLevel, message: string, meta?: object): LogContext {
        return {
            timestamp: new Date().toISOString(),
            level,
            message,
            meta
        };
    }

    private async log(level: LogLevel, message: string, meta?: object): Promise<void> {
        const context = this.createLogContext(level, message, meta);

        const promises = Array.from(this.strategies).map(async (strategy) => {
            try {
                strategy.log(context);
            } catch (error) {
                console.error('Logging strategy failed:', error);
            }
        });

        await Promise.all(promises);
    }

    public async info(message: string, meta?: object): Promise<void> {
        await this.log(LogLevel.INFO, message, meta);
    }

    public async warn(message: string, meta?: object): Promise<void> {
        await this.log(LogLevel.WARN, message, meta);
    }

    public async error(message: string, meta?: object): Promise<void> {
        await this.log(LogLevel.ERROR, message, meta);
    }
}

