import { ServerConfiguration, RouterConfiguration, ConfiguredServer } from '@methodus/server';
import { Express } from '@methodus/platform-express';
import { DataController } from './controller';
@ServerConfiguration(Express, { port: 6695 }) // instantiate express on given port
@RouterConfiguration(DataController, Express) // attach the DataController class to the Express instance 
export class Xserver extends ConfiguredServer {
    constructor() {
        super(Xserver);
    }
}
(() => {
    return new Xserver();
})();