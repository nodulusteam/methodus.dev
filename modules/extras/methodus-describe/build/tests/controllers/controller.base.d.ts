import { MethodResult } from '@methodus/server/commons';
export declare class BaseController {
    list(filter?: any, pageNumber?: number, pageSize?: number, req?: any): Promise<any>;
    get(id: number, host?: string): Promise<MethodResult<{
        userId: number;
        id: number;
        title: string;
        body: string;
    }[]>>;
    read(playerId: number): Promise<MethodResult<number>>;
    getByField(field: string, value: number): Promise<MethodResult<{}>>;
}
