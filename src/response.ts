

export class MethodError extends Error {
    error: string;
    statusCode: number;
    constructor(message, statusCode) {
        super(message);
        this.error = message;
        this.statusCode = statusCode;
    }

}

export class MethodResult {
    result: any;
    constructor(result) {
        this.result = result;
    }

}