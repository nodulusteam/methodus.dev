import 'reflect-metadata';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as path from 'path';
import { Servers } from '@methodus/server';
import { BaseServer } from '@methodus/framework-commons';
import { ExpressRouter } from './routing';
import * as http from 'http';
import * as https from 'https';
import * as fileUpload from 'express-fileupload';
import { ExpressOptions } from './options';

/**
 * @hidden
 */
export class ExpressPlugin extends BaseServer {
    _app: any;
    constructor(options: ExpressOptions) {
        super();
        this._app = express();
        if (options.fileUpload) {
            this._app.use(fileUpload({
                limits: { fileSize: options.fileUpload || 50 * 1024 * 1024 },
            }));
        }


        this._app.use(bodyParser.urlencoded({
            extended: true,
        }));

        this._app.use(bodyParser.json({ limit: '10mb' }));
        this._app.use(cookieParser());

        this._app.set('showStackError', true);
        this._app.set('view engine', 'ejs');
        const viewPath = path.join(__dirname, '..', '..', '..', 'views');
        this._app.set('views', viewPath);


        if (options.cors) {
            // Add headers
            this._app.use((req: any, res: any, next: any) => {
                // Website you wish to allow to connect
                if (req.headers.origin) {
                    res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
                }

                // Request methods you wish to allow
                res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
                let headersX = Object.keys(req.headers).map((headerName: any) => {
                    return headerName.split('-').map((word: any) => {
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
        }

        if (options.onStart) {
            options.onStart.forEach((eventStart: any) => {
                eventStart(this._app);
            });
        }
    }

    public static register(server: any, parentServer: any) {
        if (server.options) {
            const serverType = server.type.name;
            console.info(`> Starting Express server on port ${server.options.port}`);

            parentServer._app[serverType] = new ExpressPlugin(server.options);
            const app = Servers.set(server.instanceId, server.type.name, parentServer._app[serverType]);
            parentServer.app = app._app;

            if (server.options.secured) {
                const httpsServer = Servers.get(server.instanceId, 'https')
                    || https.createServer({
                        cert: server.options.cert,
                        key: server.options.key,
                        passphrase: server.options.passphrase,
                    }, app._app);
                parentServer._app.https = httpsServer;

                Servers.set(server.instanceId, 'https', httpsServer);

            } else {

                const httpServer = Servers.get(server.instanceId, 'http')
                    || http.createServer(app._app);
                parentServer._app.http = httpServer;

                Servers.set(server.instanceId, 'http', httpServer);
            }



        } else {
            throw new Error('Missing configuration options for Express');
        }
    }

    close() {
        return true;
        // this._app.close();
    }

    useClass(classType: any, methodType: any) {
        return new ExpressRouter(classType, methodType, this._app);
    }
}
