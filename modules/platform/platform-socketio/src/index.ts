import 'reflect-metadata';
import { ServerDefinition } from '@methodus/framework-commons';
import { SocketIOPlugin } from './socketio';
import { SocketIOParser, SocketIOResponse } from './parser';
import { send } from './transport';

export const SocketIO: ServerDefinition = Object.assign(
    {
        name: 'socketio',
        module: SocketIOPlugin,
        parser: SocketIOParser,
        response: SocketIOResponse,
    },
    { send: send }
);
