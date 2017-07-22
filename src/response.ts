

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
    total: number;
    statusCode: number;
    constructor(result, total?: number) {
        this.result = result;
        if(total)
            this.total = total;
    }

}