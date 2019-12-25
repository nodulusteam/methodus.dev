import 'reflect-metadata';
const ANNOTATIONS = '__annotations__';

export class Injector {
    private static records: { token: any, deps: any, alias?: string }[] = [];
    private static singletons: any = {};
    static inject(target: any, name?: string) {
        //use the injectable logic here
        const annotations = target.hasOwnProperty(ANNOTATIONS) ?
            target[ANNOTATIONS] :
            Object.defineProperty(target, ANNOTATIONS, { value: [] })[ANNOTATIONS];

        const constructorArgs = Reflect.getOwnMetadata('design:paramtypes', target);
        Injector.register(target, constructorArgs, name || target.name);
        annotations.push('injectable');
    }


    static resolveAndCreate(tokens: Array<any>) {
        tokens.forEach((token: any) => {
            Injector.records.push({
                token,
                deps: Reflect.getOwnMetadata('design:paramtypes', token) || []
            })
        })
        return this
    }
    static register(token: any, deps: any = [], alias?: string) {

        Injector.records.push({
            token,
            deps: deps,
            alias
        });
    }
    static get(_token: any) {
        if (!_token) {
            console.error('missing token');
        }
        //some times the token is a string so
        let symbol = _token;
        if (typeof _token !== 'string') {
            symbol = _token.name;
        }

        // get the `token` from the record set
        const all = Injector.records.filter((injectedRecord) => {
            return injectedRecord.token.name === symbol || injectedRecord.alias === symbol
        });

        if (!all || all.length === 0) {
            return null;
            // throw new Error(`Injection token not found ${symbol},
            // did you forgot to decorate it with the @Injectible decorator? `)

        }
        const record = all[0];
        // resolve dependencies into instances

        record.deps = record.deps.map((dep: any) => {
            if (dep) {
                return Injector.get(dep);
            } else {
                return null
            }
        });

        const annotations = Reflect.getOwnMetadata(ANNOTATIONS, record.token);
        if (annotations && annotations.indexOf('singleton') === -1) {
            return new record.token(...record.deps);
        }
        else {
            if (!this.singletons[record.token]) {
                this.singletons[record.token] = new record.token(...record.deps);
            }
            return this.singletons[record.token];
        }
        // create the instance of the token with the resolved dependencies

    }
}