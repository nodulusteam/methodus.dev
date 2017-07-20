

export class MethoError extends Error {
    message: string;
    statusCode: number;
    constructor(message, statusCode) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
    }

}

export class MethoResult {
    result: any;
    constructor(result) {
        this.result = result;
    }

}