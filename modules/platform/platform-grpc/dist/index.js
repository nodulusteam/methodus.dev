"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const grpc_1 = require("./grpc");
const gRpc = {
    name: 'gRpc',
    module: grpc_1.gRpcPlugin,
    parser: null,
    response: null
};
exports.default = gRpc;
