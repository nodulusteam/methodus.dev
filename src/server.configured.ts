
import { MethodusConfig } from './config';
import { LogClass, logger } from './log/';
import { Server } from './server';

@LogClass(logger)
export class ConfiguredServer {
    constructor(target?) {
        const options = target.prototype.options;
        const server = new Server();
        server.config = new MethodusConfig();
        options.servers.forEach((element) => {
            server.config.run(element.serverType, element.options);
        });
        options.classes.forEach((element) => {
            server.config.use(element.controller, element.methodType, element.serverType, element.resolver);
        });
        if (options.plugins) {
            server.plugins(options.plugins);
        }
        (async () => {
            await server.start();
        })();
    }
}
