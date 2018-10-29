
import { MethodusConfig } from './config';
import { LogClass, logger } from './log/';
import { Server } from './server';

@LogClass(logger)
export class ConfiguredServer extends Server {
    constructor(target?) {
        const options = target.prototype.options;
        super();
        this.config = new MethodusConfig();
        options.servers.forEach((element) => {
            this.config.run(element.serverType, element.options);
        });
        options.classes.forEach((element) => {
            this.config.use(element.controller, element.methodType, element.serverType, element.resolver);
        });
        if (options.plugins) {
            this.plugins(options.plugins);
        }
        (async () => {
            await this.start();

        })();
    }
}
