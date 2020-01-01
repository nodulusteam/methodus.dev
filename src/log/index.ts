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

    info(...args: any) {
        (args) ?
            this.logger('#INFO#', args.join(',')) : null;
    }
    log(...args: any) {
        (args) ?
            this.logger('#DEBUG#', args.join(',')) : null;
    }
    debug(...args: any) {
        (args) ?
            this.logger('#DEBUG#', args.join(',')) : null;
    }
    error(...args: any) {
        (args) ?
            this.logger('#ERROR#', args.join(',')) : null;
    }
    warn(...args: any) {
        (args) ?
            this.logger('#WARN#', args.join(',')) : null;
    }
    
}





export const logger = new Logger('general');
