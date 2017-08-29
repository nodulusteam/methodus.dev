import { logger, Log, LogClass } from '../log/';
import { Servers } from '../servers'

@LogClass(logger)
export class MethodError extends Error {
    error: string;
    statusCode: number;
    additional: any;
    constructor(message, statusCode?, additional?) {
        super(message);
        this.error = message;

        this.statusCode = statusCode || 500;
        if (additional)
            this.additional = additional;
    }

}