import { MethodResult } from '@methodus/server/commons';
export declare class TestTarget {
    list(pageNumber?: number, pageSize?: number): Promise<any>;
    get(id: number, host?: string): Promise<MethodResult<{}>>;
    create(files: any, cookies: any, name: string): Promise<MethodResult<{}>>;
    read(): Promise<MethodResult<{}>>;
    update(): Promise<MethodResult<{}>>;
    delete(id: string): Promise<MethodResult<{}>>;
}
