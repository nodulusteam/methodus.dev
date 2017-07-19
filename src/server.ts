import { Rest, SocketIO } from './servers';
import { MethodulusConfig } from './config'
const debug = require('debug')('methodulus');
import http = require('http');
import colors = require('colors');
export interface IApp {
    set(key, value);
}

const figlet = require('figlet');


export class Server {
    public app: any;//IApp;
    private _app: any = {};//IApp;
    constructor(port) {
        debug('activating server on ', port);
        if (!process.env.silent) {
            figlet.text('Methodulus!', {
                font: 'Delta Corps Priest 1',
                horizontalLayout: 'default',
                verticalLayout: 'default'
            }, function (err, data) {
                if (err) {
                    console.log('Something went wrong...');
                    console.dir(err);
                    return;
                }
                console.log(colors.blue(data));
            });
        } else {
            console.log(colors.green(`*****     METHODOLOGY     *****`))
        }

        global.methodulus = { server: this };

        if (process.env.servers)
            MethodulusConfig.servers = process.env.servers.split(',');

        console.log('process.env.servers', MethodulusConfig.servers);
        //debug('MethodulusConfig', JSON.parse(MethodulusConfig.servers.toString()));
        MethodulusConfig.servers.forEach((server) => {
            switch (server) {
                case 'rest':
                    {
                        console.log(colors.green(`Starting REST server on port`, port))
                        this._app[server] = Rest(port);
                        var httpServer = http.createServer(this._app[server]);
                        this._app['http'] = httpServer;
                        //listen on provided ports
                        httpServer.listen(port);
                        break;
                    }
                case 'socketio':
                    {
                        console.log(colors.green(`Starting SOCKETIO server on port`, port))
                        this._app[server] = SocketIO(port, this._app['http']);
                        break;
                    }
            }
        })
    }

    public useClass(classType) {
        MethodulusConfig.servers.forEach((server) => {
            this._app[server].useClass(classType);
        });

    }

    async _send(channel, params, message, parametersMap) {
        return await this._app[channel]._send(params, message, parametersMap);
    }
}