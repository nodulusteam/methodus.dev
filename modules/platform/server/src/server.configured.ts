
import { MethodusConfig } from '@methodus/framework-commons';
import { Server } from './server';
import { EventEmitter } from 'events';

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
        let options: any = {};
        if (this.target) {
            options = this.target.prototype.options;

        } else {
            options = (this as any).__proto__.options;
        }

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
