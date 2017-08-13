import { ILogger, Logger } from 'logelas';

const innerLogger = new Logger('methodulus.log', 'methodulus');

export class logger extends Logger implements ILogger {
    public static log(...args) {
        innerLogger.info(...args);
    }
    public static info(...args) {

        innerLogger.info(...args);
    }
    public static debug(...args) {

        innerLogger.debug(...args);
    }
    public static error(...args) {

        innerLogger.error(...args);
    }

}
