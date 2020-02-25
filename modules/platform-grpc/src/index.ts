import 'reflect-metadata';

import { ServerDefinition } from '@methodus/server';
import { gRpcPlugin } from './grpc';


const gRpc: ServerDefinition = {
    name: 'gRpc',
    module: gRpcPlugin,
    parser: null,
    response: null
}
export default gRpc;
