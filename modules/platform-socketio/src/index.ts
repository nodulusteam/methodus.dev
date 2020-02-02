import 'reflect-metadata';
import { SocketIOPlugin } from './socketio';
import { ServerDefinition } from '@methodus/server';
import { SocketIOParser, SocketIOResponse } from './parser';


export const SocketIO: ServerDefinition = {
    name: 'socketio',
    module: SocketIOPlugin,
    parser: SocketIOParser,
    response: SocketIOResponse,
}


