import * as fs from 'fs';
import * as path from 'path';
import { LogContext, LoggingStrategy } from './logging.strategy';

export class FileLoggingStrategy implements LoggingStrategy {
    private logDir: string;
    private currentLogFile: string;

    constructor(logDir: string = 'logs') {
        this.logDir = logDir;
        this.currentLogFile = this.generateLogFileName();
        this.ensureLogDirectory();
    }

    private generateLogFileName(): string {
        const date = new Date().toISOString().split('T')[0];
        return `${date}.log`;
    }

    private ensureLogDirectory(): void {
        if (!fs.existsSync(this.logDir)) {
            fs.mkdirSync(this.logDir, { recursive: true });
        }
    }

    log(context: LogContext): void {
        const { timestamp, level, message, meta } = context;
        const logMessage = `[${timestamp}] ${level}: ${message} ${meta ? JSON.stringify(meta) : ''}\n`;
        
        const filePath = path.join(this.logDir, this.currentLogFile);
        fs.appendFileSync(filePath, logMessage);
    }
}