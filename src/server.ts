import { Express, SocketIO, MQ, MQServer, Redis, RedisServer } from './servers';
import { MethodulusConfig, MethodulusConfigFromFile, MethodType, ServerType } from './config';


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
    public config: MethodulusConfig;
    constructor(port?: number) {
        this.port = port || 0;
        //this.start(port);
    }

    async startFromConfig() {
        //MethodulusConfig = MethodulusConfigFromFile()
    }
    configure(config: MethodulusConfig) {
        this.config = config
        return this;
    }
    start(port?: number) {
        this.port = this.port || port || 0;
        debug('activating server on ', port);
        if (!eval(process.env.silent)) {
            figlet.text('Methodulus', {
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

        // if (process.env.servers)
        //     this.config.servers = process.env.servers.split(',');

        let silent = eval(process.env.silent);

        //debug('MethodulusConfig', JSON.parse(MethodulusConfig.servers.toString()));
        for (let i = 0; i < this.config.servers.length; i++) {

            let server = this.config.servers[i];
            // MethodulusConfig.servers.forEach(async (server) => {
            switch (server.type) {
                case ServerType.Express:
                    {

                        if (!silent)
                            console.log(colors.green(`Starting REST server on port`, server.options.port))
                        this._app[server.type] = new Express(server.options.port);
                        var httpServer = http.createServer(this._app[server.type]._app);//this is the inside express instance
                        this._app['http'] = httpServer;
                        //listen on provided ports
                        httpServer.listen(server.options.port);
                        break;
                    }
                case ServerType.Socket:
                    {
                        if (!silent)
                            console.log(colors.green(`Starting SOCKETIO server on port`, this.port))
                        this._app[server.type] = new SocketIO(this.port, this._app['http']);
                        break;
                    }
                case ServerType.RabbitMQ:
                    {
                        if (!silent)
                            console.log(colors.green(`Starting MQ server on port`, port))
                        try {

                            this._app[server.type] = MQ(this.port, this._app['http']);
                            this._app[server.type].connection = new MQServer();
                            //this._app[server] = new MQServer();
                        } catch (error) {
                            console.log(error);
                        }

                        break;
                    }
                case ServerType.Redis:
                    {
                        if (!silent)
                            console.log(colors.green(`Starting REDIS server on port`, port))
                        try {

                            this._app[server.type] = new Redis(server.options);
                            this._app[server.type].connection = new RedisServer();
                            //this._app[server] = new MQServer();
                        } catch (error) {
                            console.log(error);
                        }

                        break;
                    }
            }
        }

        let classes = this.config.classes.entries()
        for (var i = 0; i < this.config.classes.size; i++) {
            let name, element = classes.next();
            if (element.value[1].methodType === MethodType.Local)
                this.useClass(element.value[1].classType);
        }

        return this;
    }

    public useClass(classType) {
        this.config.servers.forEach((server) => {
            this._app[server.type].useClass(classType);
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

    async _send(channel: ServerType, params, message, parametersMap) {
        return await this._app[channel]._send(params, message, parametersMap);
    }
}