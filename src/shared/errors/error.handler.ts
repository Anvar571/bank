import { LoggerService } from "../../infra/logging/logger.service";
import { AppError, DatabaseConnectionError } from "./custom.errors";
import {Request, Response} from 'express';

export class ErrorHandler {
    private static instance: ErrorHandler;
    private logger: LoggerService;

    private constructor() {
        this.logger = LoggerService.getInstance();
    }

    public static getInstance(): ErrorHandler {
        if (!ErrorHandler.instance) {
            ErrorHandler.instance = new ErrorHandler();
        }
        return ErrorHandler.instance;
    }

    public handleError(error: Error | AppError, req?: Request, res?: Response): void {
        // Log error
        this.logError(error);

        // If we have response object, send error response
        if (res) {
            this.sendErrorResponse(error, res);
        }

        // Handle critical errors
        this.handleCriticalError(error);
    }

    private logError(error: Error | AppError): void {
        if (error instanceof AppError) {
            this.logger.warn(error.message, {
                code: error.statusCode,
                stack: error.stack
            });
        } else {
            this.logger.error('Unexpected error', {
                message: error.message,
                stack: error.stack
            });
        }
    }

    private sendErrorResponse(error: Error | AppError, res: Response): void {
        if (error instanceof AppError) {
            res.status(error.statusCode).json({
                status: 'error',
                message: error.message,
                ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
            });
        } else {
            res.status(500).json({
                status: 'error',
                message: 'Internal Server Error'
            });
        }
    }

    private handleCriticalError(error: Error | AppError): void {
        // Handle any critical errors that require special attention
        if (this.isCriticalError(error)) {
            // Notify DevOps team
            // Restart server if needed
            // etc.
        }
    }

    private isCriticalError(error: Error | AppError): boolean {
        // Define your critical error conditions
        return error instanceof DatabaseConnectionError;
    }
}