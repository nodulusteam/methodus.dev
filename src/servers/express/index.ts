export * from './express';
export * from './Router';

import * as http from 'http';
import * as colors from 'colors';

import 'reflect-metadata';
import { Servers } from '../serversList';
import { logger } from '../../log';
import { Express } from './express';

export function register(server: any, parentServer: any) {
    if (server.options) {
        const serverType = server.type.name;
        logger.info(colors.green(`> Starting REST server on port ${server.options.port}`));

        parentServer._app[serverType] = new Express(server.options.port, server.options.onStart);
        const app = Servers.set(server.instanceId, server.type.name, parentServer._app[serverType]);
        parentServer.app = app._app;
        const httpServer = Servers.get(server.instanceId, 'http')
            || http.createServer(app._app);
        parentServer._app.http = httpServer;

        Servers.set(server.instanceId, 'http', httpServer);
    } else {
        throw new Error('Missing configuration options for Express');
    }

}
