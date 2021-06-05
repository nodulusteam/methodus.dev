export class MethodResult<T= any> {
    public result: T;
    public stream: any;
    public page: any;
    public total?: number;
    public statusCode?: number;
    constructor(result: T, total?: number, page?: number) {
        this.result = result;
        if (total) {
            this.total = total;
        }
        if (page) {
            this.page = page;
        }
    }
    public pipe(streamToPipe: any) {
        this.stream = streamToPipe;
    }
}




