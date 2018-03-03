import * as express from 'express';
import { MethodDescriptor, Verbs } from '../../config';
import * as path from 'path';
import { MethodError, MethodResult, MethodEvent } from '../../response/';
import { fp } from '../../fp';
import { LogLevel, logger, Log, LogClass } from '../../logger';
import { BaseServer } from '../base';
import { Request } from './Request'
import { MethodType } from '../../';


const request = require('request-promise-native');
const fs = require('fs');


import { ExpressRouter } from './Router';

import 'reflect-metadata';

@LogClass(logger)
export class ExpressPartial extends BaseServer {
    _app: any;
    constructor(app) {
        super();
        this._app = app;
    }

    useClass(classType, methodType: MethodType) {
        new ExpressRouter(classType, methodType, this._app);

        // let routers = new ExpressRouter(classType, methodType, this._app).routers;
        // routers.map((router) => {
        //     this._app.use(router);
        // });
    }



    @Log()
    _send(params, methodus, paramsMap, securityContext) {
        const request = new Request();
        let baseUrl = methodus.resolver();
        if (baseUrl) {
            let myUri = baseUrl + methodus.route;
            const pipedResult = request.sendRequest(methodus.verb, baseUrl + methodus.route, params, paramsMap, securityContext);
            return pipedResult;
        } else {
            return new MethodError('no server found for this method' + methodus.route, 302);
        }
    }
}


