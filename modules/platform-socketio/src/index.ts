import 'reflect-metadata';
import { SocketIOPlugin } from './socketio';
import {  ServerDefinition } from '@methodus/server';


export const SocketIO: ServerDefinition = {
    name: 'socketio',
    module: SocketIOPlugin
}


// export function register(server: any, parentServer: any) {

//     console.log(colors.green(`> Starting SOCKETIO server`));

//     const httpServer = Servers.get(server.instanceId, 'http')
//         || http.createServer(parentServer._app);

//     Servers.set(server.instanceId, 'http', httpServer);

//     const app = new SocketIO(server.options, httpServer);
//     Servers.set(server.instanceId, server.type.name, app);

// }
