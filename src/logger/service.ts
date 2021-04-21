import { createLogger, format, transports, Logger } from 'winston';

import { Log } from './';

export default class LogClass {
  private logger: Logger;
  private static logger: Logger;

  constructor() {
    this.logger = this.getLoggerInstance();
  }

  private makeLogger() {
    LogClass.logger = createLogger({
      transports: [
        new transports.File({
          filename: 'error.log',
          level: 'error',
          format: format.json()
        }),
        new transports.Console({
          level: 'info',
          format: format.combine(
            format.colorize(),
            format.simple()
          )
        })
      ]
    });
  }

  private getLoggerInstance () {
    if(!LogClass.logger){
      this.makeLogger();
    }
    return LogClass.logger;
  }

  info (message: string) {
    this.logger.info(`${new Date()} - ${message}`);
  }

  error (message: string) {
    this.logger.error(`${new Date()} - ${message}`);
  }
}