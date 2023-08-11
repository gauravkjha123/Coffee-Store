import { Injectable, ConsoleLogger } from '@nestjs/common';
import { ConsoleLoggerOptions } from '@nestjs/common/services/console-logger.service';
import { ConfigService } from '@nestjs/config';
import getLogLevels from '../utils/getLogLevels';
import LogsService from './logs.service';
import * as winston from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';

@Injectable()
class CustomLogger extends ConsoleLogger {
  private readonly logsService: LogsService;
  private readonly logger: winston.Logger;

  constructor(
    context: string,
    options: ConsoleLoggerOptions,
    configService: ConfigService,
    logsService: LogsService,
  ) {
    const environment = configService.get('NODE_ENV');

    super(context, {
      ...options,
      logLevels: getLogLevels(environment === 'production'),
    });

    this.logsService = logsService;

    const transport = new DailyRotateFile({
      filename: 'logs/application-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    });

    this.logger = winston.createLogger({
      transports: [transport, new winston.transports.Console()],
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ level, message, timestamp }) => {
          return `[${timestamp}] ${level}: ${message}`;
        }),
      ),
    });
  }

  log(message: string, context?: string) {
    super.log(message, context);

    this.logger.log('info', `${context ? `[${context}] ` : ''}${message}`);
  }

  error(message: string, trace?: string, context?: string) {
    super.error(message, trace, context);

    this.logger.error(`${context ? `[${context}] ` : ''}${message}`, trace);
  }

  warn(message: string, context?: string) {
    super.warn(message, context);

    this.logger.warn(`${context ? `[${context}] ` : ''}${message}`);
  }

  debug(message: string, context?: string) {
    super.debug(message, context);

    this.logger.debug(`${context ? `[${context}] ` : ''}${message}`);
  }

  verbose(message: string, context?: string) {
    super.verbose(message, context);

    this.logger.verbose(`${context ? `[${context}] ` : ''}${message}`);
  }
}

export default CustomLogger;
