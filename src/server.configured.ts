
import { MethodusConfig } from './config';
import { LogClass, logger } from './log/';
import { Server } from './server';
import { EventEmitter } from 'events';

@LogClass(logger)
export class ConfiguredServer extends EventEmitter {
    server?: Server;
    target: any;
    constructor(target?: any) {

        super();
        if (target) {
            this.target = target;
        }
        this.init();
    }
    public async init() {
        const options = this.target.prototype.options;

        const server = new Server();
        this.server = server;
        server.config = new MethodusConfig();

        options.servers.forEach((element: any) => {
            if (server.config) {
                server.config.run(element.serverType, element.options);
            }
        });
        options.classes.forEach((element: any) => {
            if (server.config) {
                server.config.use(element.controller, element.methodType, element.serverType);
            }
        });

        options.clients.forEach((element: any) => {
            if (server.config) {
                server.config.useClient(element.controller, element.transportType, element.resolver);
            }
        });

        if (options.plugins) {
            server.plugins(options.plugins);
        }

        await server.start();
        this.emit('ready');

    }

    public kill() {
        if (this.server) {
            this.server.kill();
        }
    }

}
