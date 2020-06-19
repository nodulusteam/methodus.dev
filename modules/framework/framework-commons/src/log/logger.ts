export class Logger {
    logger: any;

    constructor(name: string) {
        this.logger = require('debug')(`methodus:${name}`);
    }
    safeJSON(item: any) {
        let stringResult;
        try {
            stringResult = JSON.stringify(item);
        } catch (error) {
            stringResult = item.toString();
        }
        return stringResult;
    }
    getArgs(...args: any[]) {
        return args
            .map((item: any) => {
                if (item instanceof Object && item !== null) {
                    return this.safeJSON(item);
                }
                return item;
            })
            .join(',');
    }
    print(verb: string, args: any[]) {
        if (args) {
            this.logger(`#${verb}#`, this.getArgs(args));
        }
    }
    info(...args: any[]) {
        this.print('INFO', args);
    }
    log(...args: any[]) {
        this.print('DEBUG', args);
    }
    debug(...args: any[]) {
        this.print('DEBUG', args);
    }
    error(...args: any[]) {
        this.print('ERROR', args);
    }
    warn(...args: any[]) {
        this.print('WARN', args);
    }
}

export const logger = new Logger('general');
