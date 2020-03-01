import 'reflect-metadata';
import { BaseServer, Servers } from '@methodus/server';

import * as colors from 'colors';
import * as grpc from 'grpc';
import { gRpcRouter } from './grpc.router';




/**
 * @hidden
 */
export class gRpcPlugin extends BaseServer {
    _app: any;
    constructor(port: any, onStart?: any) {
        super();
        const gRpcServer = new grpc.Server();
        gRpcServer.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
        gRpcServer.start();
        this._app = gRpcServer;

    }

    public static register(server: any, parentServer: any) {
        if (server.options) {
            const serverType = server.type.name;
            console.info(colors.green(`> Starting gRPC server on port ${server.options.port}`));

            parentServer._app[serverType] = new gRpcPlugin(server.options.port, server.options.onStart);
            Servers.set(parentServer.instanceId, server.type.name, parentServer._app[serverType]);
            return parentServer._app[serverType];
        } else {
            throw new Error('Missing configuration options for Express');
        }
       
    }

    close() {
        return true;
        // this._app.close();
    }

    useClass(classType: any, methodType: any) {
        return new gRpcRouter(classType, methodType, this._app);
    }
}
