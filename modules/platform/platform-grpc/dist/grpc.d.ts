import 'reflect-metadata';
import { BaseServer } from '@methodus/server';
import { gRpcRouter } from './grpc.router';
export declare class gRpcPlugin extends BaseServer {
    _app: any;
    constructor(port: any, onStart?: any);
    static register(server: any, parentServer: any): any;
    close(): boolean;
    useClass(classType: any, methodType: any): gRpcRouter;
}
