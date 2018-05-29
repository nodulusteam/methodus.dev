import { logger, Log, LogClass } from '../log/';
import { Servers } from '../servers'



export class MethodResult<T= any> {
    private _on: { [key: string]: Function } = {};
    result: T;
    stream: any;
    page: number;
    total: number;
    statusCode: number;
    headers: any = {};
    constructor(result: T, total?: number, page?: number) {
        this.result = result;
        if (total)
            this.total = total;
        if (page)
            this.page = page;

    }
    pipe(streamToPipe) {
        this.stream = streamToPipe;
        return this.stream;
    }
    setHeader(key, value) {
        this.headers[key] = value;
    }
    on(key, value) {
        this._on[key] = value;
    }

}




export class MethodResultStatus<T= any> {
    result: T;
    page: number;
    total: number;
    statusCode: number;
    constructor(result: T, statusCode: number, total?: number, page?: number) {
        this.statusCode = statusCode;

        this.result = result;
        if (total)
            this.total = total;
        if (page)
            this.page = page;
    }


}


