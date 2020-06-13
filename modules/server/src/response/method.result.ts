import commons from '@methodus/framework-commons';

export class MethodResult<T = any> {
    stream: any;
    page: number = 1;
    total: number = 0;
    result: T;
    statusCode: number = 200;
    headers: any = {};
    private _on: { [key: string]: () => {} } = {};
    private links: string[] = [];
    constructor(result: T, total?: number, page?: number) {
        this.result = result;
        if (total) {
            this.total = total;
        }
        if (page) {
            this.page = page;
        }
    }
    public getLinks() {
        return this.links;
    }
    public pipe(streamToPipe: any) {
        this.stream = streamToPipe;
        return this.stream;
    }
    public setHeader(key: any, value: any) {
        this.headers[key] = value;
    }
    public on(key: any, value: any) {
        this._on[key] = value;
    }
    public linkAction(propertyKey: any, linksSource: any, rel?: string, datasource: any = {}, host: string = '') {
        const methodus = commons.util.maybeMethodus(linksSource);
        const links = methodus[linksSource.name];
        const mappedLinks: any = Object.values(links._descriptors).filter((action: any) => {
            return propertyKey === action.propertyKey;
        });
        const actionProp = mappedLinks[0];
        if (Array.isArray(this.result)) {
            this.result.forEach((item) => {
                this.links.push(this.compileLink(actionProp, item,
                    rel || linksSource.name, host).toString());
            });
        } else {
            this.links.push(this.compileLink(actionProp, datasource || this.result,
                rel || linksSource.name, host).toString());
        }


    }
    public apply() {
        this.setHeader('Link', JSON.stringify(this.links));
        return this;
    }
    protected compileLink(action: any, data: any, rel: string, host: string): RestLink {
        action.compiledRoute = host + action.route;
        action.params.forEach((param: MethodusParam) => {
            if (param.from === 'params') {
                const mappedProperty = param.name;
                action.compiledRoute = action.compiledRoute.replace(
                    `:${param.name}`,
                    data[mappedProperty],
                );
            }
        });

        return new RestLink(rel, action.compiledRoute, action.verb, ['application/json'], action.propertyKey);
    }

}

// tslint:disable-next-line:interface-name
interface MethodusParam {
    name: string;
    from: string;
}

export class RestLink {
    constructor(public rel: string,
        public href: string,
        public action: string,
        public types: string[],
        public methodKey: string) {

    }

    public toString() {
        return `href=//${this.href},verb=${this.action},rel=${this.rel},action=${this.methodKey}`;
    }

}

export class MethodResultStatus<T = any> extends MethodResult<T> {
    page: number = 1;
    total: number = 0;
    statusCode: number;
    constructor(result: T, statusCode: number, total?: number, page?: number) {
        super(result, total, page);
        this.statusCode = statusCode;
    }
    linkAction(propertyKey: any, linksSource: any, rel?: string, datasource: any = {}, host: string = '') {
        super.linkAction(propertyKey, linksSource, rel, datasource, host);
    }
}
