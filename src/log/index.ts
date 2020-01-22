import { Injectable } from '../di/decorators/injectable';


@Injectable('Logger')
export class Logger {
    logger: any;
    /**
     *
     */
    constructor(name: string) {
        this.logger = require('debug')(`methodus:${name}`);
    }
    getArgs(...args: any[]) {
        return args.map((item: any) => {
            if (item instanceof Object && item !== null) {
                return JSON.stringify(item);
            }
            return item;
        }).join(',');
    }
    info(...args: any[]) {
        (args) ?
            this.logger('#INFO#', this.getArgs(args)) : null;
    }
    log(...args: any[]) {
        (args) ?
            this.logger('#DEBUG#', this.getArgs(args)) : null;
    }
    debug(...args: any[]) {
        (args) ?
            this.logger('#DEBUG#', this.getArgs(args)) : null;
    }
    error(...args: any[]) {
        (args) ?
            this.logger('#ERROR#', this.getArgs(args)) : null;
    }
    warn(...args: any[]) {
        (args) ?
            this.logger('#WARN#', this.getArgs(args)) : null;
    }

}





export const logger = new Logger('general');
