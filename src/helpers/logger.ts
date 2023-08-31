import winston, { Logger as WinstonLogger, transports, format } from "winston";
import { inject, injectable } from "inversify";
import "reflect-metadata";
import { ILogger } from "@/infrastructure/interfaces";
import { TYPES } from "@/infrastructure/types";
import TransportStream from "winston-transport";
@injectable()
class Logger implements ILogger {
  private logger: WinstonLogger;

  constructor(@inject(TYPES.Config) private config: any) {
    const serviceName = this.config.PROJECT.service || "default";
    this.logger = winston.createLogger({
      level: "info",
      format: format.json(),
      defaultMeta: { service: serviceName },
      transports: [new transports.File({ filename: `${serviceName}.log` })],
    });
    if (config.SERVER.hostname === "localhost") {
      this.logger.add(this.devConsole());
    }
  }

  info(message: string, meta: Record<string, unknown> = {}): void {
    this.logger.info(message, meta);
  }

  error(message: string, meta: Record<string, unknown> = {}): void {
    this.logger.error(message, meta);
  }

  warn(message: string, meta: Record<string, unknown> = {}): void {
    this.logger.warn(message, meta);
  }

  debug(message: string, meta: Record<string, unknown> = {}): void {
    this.logger.debug(message, meta);
  }
  private devConsole(): TransportStream {
    return new winston.transports.Console({
      format: winston.format.combine(
        winston.format.prettyPrint(),
        winston.format.colorize({ all: true }),
        winston.format.printf((log) => {
          if (log.level.includes("error")) {
            let message = ` ${log.level}: ${log.message.trim()} ,${
              log.module
            } , ${log.type}`;
            if (log.params) {
              message += ` ,\x1b[36m ${JSON.stringify(
                { carriers: log?.carrierInfo, requestData: log?.params },
                null,
                2
              )}\x1b[0m , ${log?.trace}`;
            }
            return message;
          }
          return ` ${log.level}: ${log.message.trim()} `;
        })
      ),
    });
  }
}

export default Logger;
