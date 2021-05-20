export interface Type<T> {
    new (...args: any[]): T;
}
export interface IRepo<T> {
    save(a: T): Promise<any>;
}
export interface IRepoStatic<T> extends Type<IRepo<T>> {
    save(a: T): Promise<any>;
}
export declare function staticImplements<T>(): (constructor: T) => void;
