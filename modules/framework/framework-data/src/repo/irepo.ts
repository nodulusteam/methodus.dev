import { Query } from '../query/query';
// export interface IRepo { 
//     //method(): void;
//     //get(pk: string);
//     //getAll()
//     //save(data: any);
//     //insert(data: any);
//     //update(filter: any, updateData: any, upsert?: boolean);
//     //delete(filter:any);
//     //query(q: Query);
// }


// export interface Type<T> {
//     new (...args: any[]): T;
//     prototype: T;
// }

// /* static interface declaration */
// export interface IRepoStatic<T> /*extends Type<IRepo<T>>*/ {
//     save(data: T);
// }

// /* interface declaration */
// /*export interface IRepo<T> {
//     save(data: T);
// }*/

// /* class decorator */
// export function staticImplements<T>() {
//     return (constructor: T) => {}
// }



export interface Type<T> {
    new(...args: any[]): T;    
}

/* interface declaration */
export interface IRepo<T> {
    save(a: T): Promise<any>;
}

/* static interface declaration */
export interface IRepoStatic<T> extends Type<IRepo<T>> {
    save(a: T): Promise<any>;
}



/* class decorator */
export function staticImplements<T>() {
    return (constructor: T) => {}
}