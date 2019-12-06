import 'reflect-metadata';
export * from './express';
import * as express from 'express';
export * from './Router';


import { Injector } from '@methodus/server';
import { ExpressPlugin } from './express';

export interface ServerDefinition {
    name: string;
    path?: string;
    static?: any;
    module?: any;
}

const mo = Injector.get(ExpressPlugin);

export const Express: ServerDefinition = {
    name: 'express',
    // path: path.join(__dirname, 'express'),
    module: mo,
    static: express.static,
    // register: (server: any, parentServer: any) => {
    //     if (server.options) {
    //         const serverType = server.type.name;
    //         logger.info(colors.green(`> Starting REST server on port ${server.options.port}`));

    //         parentServer._app[serverType] = new ExpressPlugin(server.options.port, server.options.onStart);
    //         const app = Servers.set(server.instanceId, server.type.name, parentServer._app[serverType]);
    //         parentServer.app = app._app;
    //         const httpServer = Servers.get(server.instanceId, 'http')
    //             || http.createServer(app._app);
    //         parentServer._app.http = httpServer;

    //         Servers.set(server.instanceId, 'http', httpServer);
    //     } else {
    //         throw new Error('Missing configuration options for Express');
    //     }
    // }
}
