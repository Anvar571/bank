import ConfigService from './config/config';
import { LoggerService } from './infrastructure/logging/logger.service';
import { LoggingConfiguration } from './infrastructure/logging/logging.config';
import { ErrorHandler } from './domain/errors/error.handler';
import { ExpressApp } from './interfeces/expres-app';

export function startServer() {
  LoggingConfiguration.configure({
    enableConsole: true,
    enableFile: false,
    enableDatabase: false,
    logDir: 'logs',
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
      logger.error('Failed to start server: ', { error: error.message });
    } else {
      logger.error('Failed to start server: ', { error });
    }
  }
}

startServer();
