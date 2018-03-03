import { logger, Log, LogClass } from '../log/';
import { Servers } from '../servers'



export class MethodResult {
    private _on: any;
    result: any;
    stream: any;
    page: any;
    total: number;
    statusCode: number;
    headers: any = {};
    constructor(result, total?: number, page?: number) {
        this.result = result;
        if (total)
            this.total = total;
        if (page)
            this.page = page;

        this._on = {};

    }
    pipe(streamToPipe) {
        this.stream = streamToPipe;
    }
    setHeader(key, value) {
        this.headers[key] = value;
    }
    on(key, value) {
        this._on[key] = value;
    }

}



export class MethodResultStatus {
    result: any;
    page: any;
    total: number;
    statusCode: number;
    constructor(result, statusCode: number, total?: number, page?: number) {
        this.statusCode = statusCode;

        this.result = result;
        if (total)
            this.total = total;
        if (page)
            this.page = page;
    }


}


