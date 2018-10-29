export class MethodResult<T= any> {
    stream: any;
    page: number;
    total: number;
    result: T;
    statusCode: number;
    headers: any = {};
    private _on: { [key: string]: () => {} } = {};
    constructor(result: T, total?: number, page?: number) {
        this.result = result;
        if (total) {
            this.total = total;
        }
        if (page) {
            this.page = page;
        }
    }
    public pipe(streamToPipe) {
        this.stream = streamToPipe;
        return this.stream;
    }
    public setHeader(key, value) {
        this.headers[key] = value;
    }
    public on(key, value) {
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
        if (total) {
            this.total = total;
        }
        if (page) {
            this.page = page;
        }
    }
}
