import 'reflect-metadata';
import { SocketIO } from './socketio';
import * as colors from 'colors';
import * as http from 'http';
import { Servers } from '../serversList';
import { logger } from '../../log';

export function register(server: any, parentServer: any) {
    logger.info(this, colors.green(`> Starting SOCKETIO server`));
    console.log(colors.green(`> Starting SOCKETIO server`));

    const httpServer = Servers.get(server.instanceId, 'http')
        || http.createServer(parentServer._app);
    // parentServer._app.http = httpServer;
    Servers.set(server.instanceId, 'http', httpServer);
    // if (!httpServer) {
    //     httpServer = this.httpServer;
    // }

    const app = new SocketIO(server.options, httpServer);
    Servers.set(server.instanceId, server.type.name, app);

}
