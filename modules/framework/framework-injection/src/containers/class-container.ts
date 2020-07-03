/**
 * @hidden
 */
export class _ClassContainer {
    _deps: Map<string, any>;
    constructor() {
        this._deps = new Map<string, any>();
    }
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
/**
 * @hidden
 */
export const ClassContainer: _ClassContainer = (global as any)
    .METHODUS_CONTAINER; // new _ClassContainer();
export * from './client-container';
