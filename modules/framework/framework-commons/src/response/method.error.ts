import { Dictionary } from "../interfaces";

 
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
       
        this.error = message;
        this.statusCode = statusCode || 500;
        if (additional) {
            this.additional = additional;
        }

    }
}
