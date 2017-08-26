import { logger, Log, LogClass } from './log/';
import { Servers } from './servers'

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
@LogClass(logger)
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
@LogClass(logger)
export class MethodEvent {
    name: string;
    value: any;

    constructor(name: string, value: any) {
        this.value = value;
        this.name = name;
        Servers.emit(this);
    }

}

export function generateUuid() {
    return Math.random().toString() +
        Math.random().toString() +
        Math.random().toString();
}

@LogClass(logger)
export class MethodMessage {
    to: string;
    message: any;
    metadata: any;
    args: any;
    correlationId: string;
}