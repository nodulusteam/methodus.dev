import 'reflect-metadata';
import * as fs from 'fs';
import * as path from 'path';
import * as fastify from 'fastify';
import { BaseServer } from '../base';
import { MethodEvent } from '../../response/';
import { fp } from '../../fp';
import { logger, LogClass } from '../../log';
import { MethodType } from '../../interfaces/methodus';

import * as http from 'http';
import * as colors from 'colors';
import { Servers } from '..';

@LogClass(logger)
export class Fastify extends BaseServer {
    _app: any;
    constructor(port?: number, onStart?: () => {}) {
        super();
        const baseCertPath = path.join(process.cwd(), 'cert');
        const options: any = {
            logger: { level: 'debug' },
            http2: true,
            https: {
                allowHTTP1: true,
                key: fs.readFileSync(path.join(baseCertPath, 'server.key')),
                cert: fs.readFileSync(path.join(baseCertPath, 'server.cert')),
            },
        };

        this._app = fastify(options);
        this._app.listen(port, (err: any, address: any) => {
            if (err) {
                throw err;
            }
            this._app.log.error(`server listening on ${address}`);
        });

        // function errorHandler(err, req, res, next) {
        //     var errorCode = '500';
        //     var errReason = 'Exception';
        //     var stack = err.stack;
        //     logger.error(`${errorCode}. Error ${new Date()} AppServer ${errReason}   ${500} ${err} ${stack}`);

        //     res.status(500);
        //     res.render('error', {
        //         error: err,
        //         stack: stack
        //     });
        // }
    }
    close() {
        this._app.close();
    }

    useClass(classType: any, methodType: any) {
        this._app.ready(() => {
            console.log(`fastify is ready.`);
        });
        return new FastifyRouter(classType, methodType, this._app);
    }

    _send(params: any, methodus: any, paramsMap: any, securityContext: any) {
        // const request = new Request();
        // const baseUrl = methodus.resolver();
        // if (baseUrl) {
        //     return request.sendRequest(methodus.verb, baseUrl + methodus.route, params, paramsMap, securityContext);
        // } else {
        //     return new MethodError('no server found for this method' + methodus.route, 302);
        // }
    }

    async _sendEvent(methodEvent: MethodEvent) {
        return methodEvent;
    }
}

export class FastifyRouter {
    public routers: any = [];
    constructor(obj: any, methodType: MethodType, app: any) {
        const methodus = fp.maybeMethodus(obj)[obj.name];

        const proto = fp.maybeProto(obj);
        const globalMiddlewares: any = [];
        if (methodus.middlewares) {
            methodus.middlewares.forEach((element: any) => {
                if (element) {
                    globalMiddlewares.push(element);
                } else {
                    logger.error(this, 'could not load middleware');
                }
            });
        }

        const routerDataObject: any = {};
        // build routes and verbs object
        Object.keys(methodus._descriptors).forEach((itemKey: any) => {
            const item = methodus._descriptors[itemKey];
            routerDataObject[item.route] = routerDataObject[item.route] || [];
            routerDataObject[item.route].push(item);
        });

        Object.keys(routerDataObject).forEach((route: string) => {
            routerDataObject[route].map((item: any) => {
                const verb = item.verb.toLowerCase();
                const functionArray: any[] = [...globalMiddlewares];
                if (item.middlewares) {
                    logger.info(this, `loading middleware for ${item.propertyKey}`);
                    item.middlewares.forEach((element: any) => {
                        if (element) {
                            functionArray.push(element);
                        }
                    });
                }
                functionArray.push(proto[item.propertyKey].bind(obj));
                app[verb](route, { logLevel: 'debug' }, async (request: any, reply: any) => {
                    await functionArray[0](request, reply);
                });
            });
        });
    }
}

export function register(server: any, parentServer: any) {
    const serverType = server.type.name;

    logger.info(this, colors.red(`> Starting HTTP2 server on port ${server.options.port}`));
    console.log(colors.red(`> Starting HTTP2 server on port ${server.options.port}`));
    parentServer._app[serverType] = new Fastify(server.options.port, server.options.onStart);
    const app = Servers.set(server.instanceId, server.type.name, parentServer._app[serverType]);
    parentServer.app = app._app;

    const httpServer = Servers.get(server.instanceId, 'http')
        || http.createServer(app._app);
        parentServer._app.http = httpServer;
    Servers.set(server.instanceId, 'http', httpServer);

}
