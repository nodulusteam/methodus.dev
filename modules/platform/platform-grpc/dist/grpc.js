"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gRpcPlugin = void 0;
require("reflect-metadata");
const server_1 = require("@methodus/server");
const colors = require("colors");
const grpc = require("grpc");
const grpc_router_1 = require("./grpc.router");
class gRpcPlugin extends server_1.BaseServer {
    constructor(port, onStart) {
        super();
        const gRpcServer = new grpc.Server();
        gRpcServer.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
        gRpcServer.start();
        this._app = gRpcServer;
    }
    static register(server, parentServer) {
        if (server.options) {
            const serverType = server.type.name;
            console.info(colors.green(`> Starting gRPC server on port ${server.options.port}`));
            parentServer._app[serverType] = new gRpcPlugin(server.options.port, server.options.onStart);
            server_1.Servers.set(parentServer.instanceId, server.type.name, parentServer._app[serverType]);
            return parentServer._app[serverType];
        }
        else {
            throw new Error('Missing configuration options for Express');
        }
    }
    close() {
        return true;
    }
    useClass(classType, methodType) {
        return new grpc_router_1.gRpcRouter(classType, methodType, this._app);
    }
}
exports.gRpcPlugin = gRpcPlugin;
