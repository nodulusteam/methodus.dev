

export class MethodError extends Error {
    error: string;
    statusCode: number;
    additional: any;
    constructor(message, statusCode, additional?) {
        super(message);
        this.error = message;
        this.statusCode = statusCode;
        if(additional)
            this.additional = additional;
    }

}

export class MethodResult {
    result: any;
    page: any;
    total: number;
    statusCode: number;
    constructor(result, total?: number, page?: number) {
        this.result = result;
        if (total)
            this.total = total;
        if (page)
            this.page = page;
    }

}

export class MethodEvent {
    name: string;
    value: any;

    constructor(name: string, value: any) {
        this.value = value;
        this.name = name;


        global.methodulus.server.sendEvent(name, value);

    }

}

export function generateUuid() {
    return Math.random().toString() +
        Math.random().toString() +
        Math.random().toString();
}

export class MethodMessage {
    to: string;
    message: any;
    metadata: any;
    args: any;
    correlationId: string;
}