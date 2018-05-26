
import { Server } from './server';
import { MethodusConfig, MethodusConfigFromFile } from './config';
import { MethodType, ServerType } from './interfaces';
import { MethodEvent } from './response';
import { fp } from './fp';
import { logger, Log, LogClass } from './log/';
let metadataKey = 'methodus';

@LogClass(logger)
export class ConfiguredServer extends Server {


    constructor(options?) {
        super();
        this.config = new MethodusConfig();

        options.servers.forEach(element => {
            this.config.run(element.serverType, element.options);
        });
        options.classes.forEach(element => {
            this.config.use(element.controller, element.methodType, element.serverType, element.resolver);
        });

        (async () => {
            await this.start();

        })()

    }

}
