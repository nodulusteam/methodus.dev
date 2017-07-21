import { Rest, SocketIO, MQ, MQServer } from './servers';
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
    private port: number = 0;
    constructor(port?: number) {
        this.port = port || 0;
        this.start(port);
    }
    async start(port?: number) {
        this.port = port || 0;
        debug('activating server on ', port);
        if (!process.env.silent) {
            figlet.text('Methodulus!', {
                font: 'Delta Corps Priest 1',
                horizontalLayout: 'default',
                verticalLayout: 'default'
            }, function (err, data) {
                if (err) {


                    return;
                }
                console.log(colors.blue(data));
            });
        } else {
            //console.log(colors.green(`*****     METHODOLOGY     *****`))
        }

        global.methodulus = { server: this };

        if (process.env.servers)
            MethodulusConfig.servers = process.env.servers.split(',');

        let silent = process.env.silent;

        //debug('MethodulusConfig', JSON.parse(MethodulusConfig.servers.toString()));
        for (let i = 0; i < MethodulusConfig.servers.length; i++) {

            let server = MethodulusConfig.servers[i];
            // MethodulusConfig.servers.forEach(async (server) => {
            switch (server) {
                case 'rest':
                    {

                        if (!silent)
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
                        if (!silent)
                            console.log(colors.green(`Starting SOCKETIO server on port`, port))
                        this._app[server] = SocketIO(port, this._app['http']);
                        break;
                    }
                case 'amqp':
                    {
                        if (!silent)
                            console.log(colors.green(`Starting MQ server on port`, port))
                        try {

                            this._app[server] = MQ(port, this._app['http']);
                            this._app[server].connection = new MQServer();
                            //this._app[server] = new MQServer();
                        } catch (error) {
                            console.log(error);
                        }

                        break;
                    }
            }
        }
    }

    public useClass(classType) {
        MethodulusConfig.servers.forEach((server) => {
            this._app[server].useClass(classType);
        });

    }
    public kill() {
        ['http', 'socketio'].forEach((server) => {
            if (this._app[server]) {
                this._app[server].close();
                delete this._app[server];
            }
        });
    }

    async _send(channel, params, message, parametersMap) {
        return await this._app[channel]._send(params, message, parametersMap);
    }
}