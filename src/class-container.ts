export class _ClassContainer {
    /**
     *
     */
    constructor() {
        this._deps = new Map<string, any>();

    }
    _deps: Map<string, any>;
    public set<T>(name: string, dep: any) {
        this._deps.set(name, dep);
    }
    public get<T>(name: string) {
        return this._deps.get(name);
    }
}


if (!(global as any).METHODUS_CONTAINER) {
    (global as any).METHODUS_CONTAINER = new _ClassContainer();
}
export const ClassContainer = (global as any).METHODUS_CONTAINER;//new _ClassContainer();

