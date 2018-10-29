import 'reflect-metadata';
import { MethodError } from '../../response/';
import {  logger,  LogClass } from '../../log';
import { BaseServer } from '../base';
import { Request } from './Request'
import { MethodType } from '../../';
import { ExpressRouter } from './Router';

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



  
    _send(params, methodus, paramsMap, securityContext) {
        const request = new Request();
        let baseUrl = methodus.resolver();
        if (baseUrl) {
            let myUri = baseUrl + methodus.route;
            const pipedResult = request.sendRequest(methodus.verb, myUri, params, paramsMap, securityContext);
            return pipedResult;
        } else {
            return new MethodError('no server found for this method' + methodus.route, 302);
        }
    }
}


