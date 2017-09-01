import * as express from "express";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";

import * as path from "path";
import { MethodDescriptor, Verbs, MethodError, MethodResult, MethodEvent } from '../index';


import { fp } from '../fp';
import { BaseServer } from './base';

import errorHandler = require("errorhandler");
import compression = require("compression");
import methodOverride = require("method-override");
import { logger, Log, LogClass } from '../log/';
const debug = require('debug')('methodulus');

const request = require('request-promise-native');

import "reflect-metadata";

@LogClass(logger)
export class Express extends BaseServer {
    _app: any;
    constructor(port) {
        super();
        this._app = express();
        this._app.use(bodyParser.urlencoded({
            extended: true
        }));

        this._app.use(bodyParser.json());

    }
    close() {
        this._app.close();
    }

    @Log()
    useClass(classType) {
        this._app.use(new ExpressRouter(classType).router);
        this._app.use(new ExpressEventBus(classType).router);
    }

    @Log()
    async _sendEvent(methodEvent: MethodEvent) {

    }

    @Log()
    async _send(params, methodulus, paramsMap) {
        logger.debug('in _send:', params, methodulus, paramsMap);
        let baseUrl = await methodulus.resolver();
        let myUri = baseUrl + methodulus.route;
        let body = null;
        paramsMap.forEach((item) => {
            item.value = params[item.index];
            if (item.name)
                myUri = myUri.replace(':' + item.name, item.value);
            else
                body = item.value;
        })
        let requestOptions: any = {
            // will be ignored
            method: methodulus.verb,
            uri: myUri,
        }
        if (body) {
            requestOptions.body = body;
            requestOptions.json = true;
        }

        logger.debug(requestOptions);
        try {
            let result = await this.finalSend(requestOptions);
            return result;
        } catch (error) {
            return new MethodError(error);
        }



    }

    async finalSend(requestOptions) {
        try {
            let result = await request(requestOptions);
            if (typeof result === 'string' && (result[0] === '{' || result[0] === '['))
                return new MethodResult(JSON.parse(result));

        } catch (error) {
            throw (new MethodError(error, error.statusCode, error.options));
        }
    }

}


@LogClass(logger)
export class ExpressRouter {
    public router: any;
    constructor(obj: any) {
        let proto = fp.proto(obj);
        let methodulus = proto.methodulus;
        //let collection = Object.getOwnPropertyNames(proto);
        let autoRouter = express.Router();
        Object.keys(methodulus._descriptors).forEach(itemKey => {
            let item = methodulus._descriptors[itemKey];
            switch (item.verb) {
                case Verbs.Get:
                    autoRouter.get(item.route, proto[itemKey].bind(obj));
                    break;
                case Verbs.Post:
                    autoRouter.post(item.route, proto[itemKey].bind(obj));

                    break;
                case Verbs.Delete:
                    autoRouter.delete(item.route, proto[itemKey].bind(obj));

                    break;
                case Verbs.Head:
                    autoRouter.head(item.route, proto[itemKey].bind(obj));

                    break;
                case Verbs.Put:
                    autoRouter.put(item.route, proto[itemKey].bind(obj));

                    break;
            }
        });

        this.router = autoRouter;
    }


}




@LogClass(logger)
export class ExpressEventBus {
    public router: any;
    constructor(obj: any) {
        let proto = fp.proto(obj);
        let methodulus = proto.methodulus;
        //let collection = Object.getOwnPropertyNames(proto);
        let autoRouter = express.Router();
        Object.keys(methodulus._events).forEach(itemKey => {
            let item = methodulus._events[itemKey];
            switch (item.verb) {
                case Verbs.Get:
                    autoRouter.get(item.route, proto[item.propertyKey].bind(obj));
                    break;
                case Verbs.Post:
                    autoRouter.post(item.route, proto[item.propertyKey].bind(obj));

                    break;
                case Verbs.Delete:
                    autoRouter.delete(item.route, proto[item.propertyKey].bind(obj));

                    break;
                case Verbs.Head:
                    autoRouter.head(item.route, proto[item.propertyKey].bind(obj));

                    break;
                case Verbs.Put:
                    autoRouter.put(item.route, proto[item.propertyKey].bind(obj));

                    break;
            }
        });

        this.router = autoRouter;
    }


}