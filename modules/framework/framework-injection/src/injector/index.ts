import 'reflect-metadata';
// import { ServersList } from '../servers/serversList';
const ANNOTATIONS = '__annotations__';

export enum RegistrationTypes {
    Main = 'main',
    Module = 'module',
    Controller = 'controller',
    Service = 'service',
    UnKnown = 'unknown',
}
export class InjectorType {
    private records: {
        registrationType: RegistrationTypes;
        token: any;
        deps: any;
        alias?: string;
    }[] = [];
    private singletons: any = {};
    inject(registrationType: RegistrationTypes, target: any, name?: string) {
        //use the injectable logic here
        const annotations = target.hasOwnProperty(ANNOTATIONS)
            ? target[ANNOTATIONS]
            : Object.defineProperty(target, ANNOTATIONS, { value: [] })[
            ANNOTATIONS
            ];

        const constructorArgs = Reflect.getOwnMetadata(
            'design:paramtypes',
            target
        );
        this.register(
            target,
            constructorArgs,
            registrationType,
            name || target.name
        );
        annotations.push('injectable');
    }

    resolveAndCreate(tokens: Array<any>) {
        tokens.forEach((token: any) => {
            this.records.push({
                registrationType: RegistrationTypes.UnKnown,
                token,
                deps: Reflect.getOwnMetadata('design:paramtypes', token) || [],
            });
        });
        return this;
    }
    register(
        token: any,
        deps: any = [],
        registrationType: RegistrationTypes,
        alias?: string
    ) {
        this.records.push({
            registrationType,
            token,
            deps: deps,
            alias,
        });
    }
    get<T = any>(_token: any): T {
        if (!_token) {
            console.error('missing token');
        }
        //some times the token is a string so
        let symbol = _token;
        if (typeof _token !== 'string') {
            symbol = _token.name;
        }

        // get the `token` from the record set
        const all = this.records.filter((injectedRecord) => {
            return (
                injectedRecord.token.name === symbol ||
                injectedRecord.alias === symbol
            );
        });

        if (!all || all.length === 0) {
            return null as any;
            // throw new Error(`Injection token not found ${symbol},
            // did you forgot to decorate it with the @Injectible decorator? `)
        }
        const record = all[0];
        // resolve dependencies into instances

        record.deps = record.deps.map((dep: any) => {
            if (dep) {
                return this.get(dep);
            } else {
                return null;
            }
        });

        const annotations = Reflect.getOwnMetadata(ANNOTATIONS, record.token);
        if (annotations && annotations.indexOf('singleton') === -1) {
            return new record.token(...record.deps);
        } else {
            if (!this.singletons[record.token]) {
                this.singletons[record.token] = new record.token(
                    ...record.deps
                );
            }
            return this.singletons[record.token];
        }
        // create the instance of the token with the resolved dependencies
    }
}

// // test for globals
let bridge = { Injector: new InjectorType() };
if (global) {
    if (!(global as any).METHODUS_DI) {
        (global as any).METHODUS_DI = bridge;
    }
    bridge = (global as any).METHODUS_DI;
}
if (!bridge.Injector) {
    bridge.Injector = new InjectorType();
}

export const Injector: InjectorType = bridge.Injector;
