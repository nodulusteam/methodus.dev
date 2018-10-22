import 'reflect-metadata';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as consolidate from 'consolidate';
import * as request from 'request-promise-native';
import * as fs from 'fs';
import * as path from 'path';
import * as fastify from 'fastify';
import { BaseServer } from './base';
import { MethodDescriptor, Verbs } from './../config';
import { MethodError, MethodResult, MethodEvent } from './../response/';
import { fp } from './../fp';

import { logger, Log, LogClass, LogLevel } from './../log';
import { MethodType } from '../interfaces/methodus';
import { Request } from './express/Request';





@LogClass(logger)
export class Fastify extends BaseServer {
    _app: any;
    constructor(port, onStart) {
        super();

        const baseCertPath = path.join(process.cwd(), 'cert');

        this._app = fastify(
            {
                logger: { level: 'info' },
                http2: true,
                https: {
                    key: fs.readFileSync(path.join(baseCertPath, 'server.key')),
                    cert: fs.readFileSync(path.join(baseCertPath, 'server.cert'))
                }
            });
        this._app.listen(port, (err, address) => {
            if (err) throw err
            this._app.log.error(`server listening on ${address}`)
        })

        function errorHandler(err, req, res, next) {
            var errorCode = '500';
            var errReason = 'Exception';
            var stack = err.stack;
            logger.error(`${errorCode}. Error ${new Date()} AppServer ${errReason}   ${500} ${err} ${stack}`);

            res.status(500);
            res.render('error', {
                error: err,
                stack: stack
            });
        }
    }
    close() {
        this._app.close();
    }


    useClass(classType, methodType) {
        new FastifyRouter(classType, methodType, this._app);
        this._app.ready(() => {
            console.log(this._app.printRoutes())
        });
    }

    @Log()
    _send(params, methodus, paramsMap, securityContext) {
        const request = new Request();
        let baseUrl = methodus.resolver();
        if (baseUrl) {          
            return request.sendRequest(methodus.verb, baseUrl + methodus.route, params, paramsMap, securityContext);
        } else {
            return new MethodError('no server found for this method' + methodus.route, 302);
        }




    }
    @Log()
    async _sendEvent(methodEvent: MethodEvent) {

    }





}


export class FastifyRouter {
    public routers: any = [];
    constructor(obj: any, methodType: MethodType, app: any) {
        let methodus = fp.maybeMethodus(obj);
        let proto = fp.maybeProto(obj);


        const globalMiddlewares = [];
        if (methodus.middlewares) {
            methodus.middlewares.forEach(element => {
                if (element) {
                    globalMiddlewares.push(element);
                } else {
                    logger.error(this, 'could not load middleware');
                }

            });
        }

        const routerDataObject = {};
        //build routes and verbs object
        Object.keys(methodus._descriptors).forEach(itemKey => {
            let item = methodus._descriptors[itemKey];
            routerDataObject[item.route] = routerDataObject[item.route] || [];
            routerDataObject[item.route].push(item);
        });


        Object.keys(routerDataObject).forEach((route: string) => {
            routerDataObject[route].map((item) => {
                let verb = item.verb.toLowerCase();
                let functionArray = [...globalMiddlewares];
                if (item.middlewares) {
                    logger.info(this, `loading middleware for ${item.propertyKey}`)
                    item.middlewares.forEach(element => {
                        if (element) {
                            functionArray.push(element);
                        }
                    });
                }
                functionArray.push(proto[item.propertyKey].bind(obj));
                app[verb](route, { logLevel: 'debug' }, async (request, reply) => {
                    const result = await functionArray[0](request, reply);
                    // return result;
                    reply.send(result.result)
                });
            });          
        });
    }
}




