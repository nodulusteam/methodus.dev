

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
    page: any;
    total: number;
    statusCode: number;
    constructor(result, total?: number, page?: number) {
        this.result = result;
        if(total)
            this.total = total;
        if (page)
            this.page = page;
    }

}