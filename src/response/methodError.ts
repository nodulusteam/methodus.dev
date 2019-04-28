import { logger, LogClass } from '../log/';

@LogClass(logger)
export class MethodError extends Error {
    error: string;
    statusCode: number;
    additional: any;
    constructor(error: any, statusCode?: any, additional?: any) {
        let message = error;
        if (typeof error === 'object') {
            message = error.message;
        }
        super(message);
        this.error = error;

        this.statusCode = statusCode || 500;
        if (additional) {
            this.additional = additional;
        }
    }
}
