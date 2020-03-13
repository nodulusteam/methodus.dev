import { Dictionary } from '../interfaces';

export class MethodError extends Error {
    error: string;
    statusCode: number;
    statusText?: string;
    additional: any;
    constructor(error: Error | string, statusCode?: number, additional?: Dictionary) {
        let message;
        if (typeof error === 'object') {
            message = error.message;
        } else {
            message = error;
        }
        super(message);
       
        // if (error.error && error.statusCode) {
        //     this.statusText = error.error;
        //     this.error = error.error;
        //     this.statusCode = error.statusCode;
        //     this.stack = error.stack;
        // } else {
        //     this.error = error;
        // }
        this.error = message;
        this.statusCode = statusCode || 500;
        if (additional) {
            this.additional = additional;
        }

    }
}
