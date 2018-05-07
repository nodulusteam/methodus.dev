import 'reflect-metadata';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as consolidate from 'consolidate';
import * as request from 'request-promise-native';
import * as fs from 'fs';
import * as path from 'path';

import { BaseServer } from '../base';
import { MethodDescriptor, Verbs } from '../../config';
import { MethodError, MethodResult, MethodEvent } from '../../response/';
import { fp } from '../../fp';
import errorHandler = require('errorhandler');
import compression = require('compression');
import methodOverride = require('method-override');
import { logger, Log, LogClass, LogLevel } from '../../log';
import { ExpressRouter, ExpressPartial, ExpressEventBus } from '../express';
import { Request } from './Request';


function urlEncode(object) {
    let map = object.value;
    let str = '';
    Object.keys(map).map(key => {
        if (Array.isArray(map[key])) {
            map[key].forEach(element => {
                str += '&' + key + '=' + element;
            });
        } else {
            str += '&' + key + '=' + map[key];
        }

    })
    str = str.substr(1) //remove preceding &
    return str;

}


@LogClass(logger)
export class Express extends BaseServer {
    _app: any;
    constructor(port, onStart) {
        super();
        this._app = express();
        this._app.use(bodyParser.urlencoded({
            extended: true
        }));

        this._app.use(bodyParser.json());
        this._app.use(cookieParser());

        this._app.set('showStackError', true);
        // Set ejs as the template engine
        //this._app.engine('server.view.html', consolidate['ejs']);
        // Set views path and view engine

        this._app.set("view engine", "ejs");
        const viewPath = path.join(__dirname, '..', '..', '..', "views");

        this._app.set("views", viewPath);


        //this._app.set('view engine',  consolidate['ejs']);
        //this._app.set('views', '../views');


        // Add headers
        this._app.use(function (req, res, next) {
            // Website you wish to allow to connect
            if (req.headers.origin) {
                res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
            }

            // Request methods you wish to allow
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            let headersX = Object.keys(req.headers).map((headerName) => {
                return headerName.split('-').map((word) => {
                    return headerName.charAt(0).toUpperCase() + headerName.substr(1);
                }).join('-');
            }).join(',');
            headersX = 'Content-Type,' + headersX;

            // Request headers you wish to allow
            res.setHeader('Access-Control-Allow-Headers', headersX);
            // Set to true if you need the website to include cookies in the requests sent
            // to the API (e.g. in case you use sessions)
            res.setHeader('Access-Control-Allow-Credentials', true);


            // Pass to next layer of middleware
            next();
        });





        if (onStart) {
            onStart(this._app);
        }





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

    @Log()
    useClass(classType, methodType) {

        new ExpressRouter(classType, methodType, this._app);
        // let routers = new ExpressRouter(classType, methodType).routers;
        // routers.map((router) => {
        //     this._app.use('/', router);
        // });

        // let router = new ExpressRouter(classType, methodType).router;
        // let routerEventBus = new ExpressEventBus(classType, methodType).router;
        // this._app.use(router);
        //this._app.use(routerEventBus);
    }

    @Log()
    _send(params, methodus, paramsMap, securityContext) {
        const request = new Request();
        let baseUrl = methodus.resolver();
        if (baseUrl) {
            let myUri = baseUrl + methodus.route;
            return request.sendRequest(methodus.verb, baseUrl + methodus.route, params, paramsMap, securityContext);
        } else {
            return new MethodError('no server found for this method' + methodus.route, 302);
        }




    }
    @Log()
    async _sendEvent(methodEvent: MethodEvent) {

    }





}







