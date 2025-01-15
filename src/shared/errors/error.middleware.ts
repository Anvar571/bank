import { NextFunction, Request, Response } from 'express';
import { ErrorHandler } from './error.handler';

export const errorMiddleware = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const errorHandler = ErrorHandler.getInstance();
    errorHandler.handleError(error, req, res);
};