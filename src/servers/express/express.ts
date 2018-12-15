import 'reflect-metadata';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as path from 'path';
import { BaseServer } from '../base';
import { MethodError, MethodEvent } from '../../response/';
import { logger, LogClass } from '../../log';
import { ExpressRouter } from '../express';
import { Request } from './Request';
import * as fileUpload from 'express-fileupload';
@LogClass(logger)
export class Express extends BaseServer {
    _app: any;
    constructor(port, onStart) {
        super();
        this._app = express();
        this._app.use(fileUpload({
            limits: { fileSize: 50 * 1024 * 1024 },
        }));

        this._app.use(bodyParser.urlencoded({
            extended: true,
        }));

        this._app.use(bodyParser.json({ limit: '10mb' }));
        this._app.use(cookieParser());

        this._app.set('showStackError', true);
        this._app.set('view engine', 'ejs');
        const viewPath = path.join(__dirname, '..', '..', '..', 'views');
        this._app.set('views', viewPath);
        // Add headers
        this._app.use((req, res, next) => {
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
            onStart.forEach((eventStart) => {
                eventStart(this._app);
            });
        }
    }
    close() {
        this._app.close();
    }

    useClass(classType, methodType) {
        const router = new ExpressRouter(classType, methodType, this._app);
    }

    _send(params, methodus, paramsMap, securityContext) {
        const request = new Request();
        const baseUrl = methodus.resolver();
        if (baseUrl) {
            const myUri = baseUrl + methodus.route;
            return request.sendRequest(methodus.verb, myUri, params, paramsMap, securityContext);
        } else {
            return new MethodError('no server found for this method' + methodus.route, 302);
        }
    }
    async _sendEvent(methodEvent: MethodEvent) {
        const myMethodEvent = methodEvent;
    }
}
