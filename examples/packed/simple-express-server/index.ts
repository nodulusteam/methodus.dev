import { ServerConfiguration, RouterConfiguration, ConfiguredServer, BuiltInServers } from '@methodus/server';
import { DataController } from './controller';
@ServerConfiguration(BuiltInServers.Express, { port: 6695 }) // instantiate express on given port
@RouterConfiguration(DataController, BuiltInServers.Express.name) // attach the DataController class to the Express instance 
export class Xserver extends ConfiguredServer {
    constructor() {
        super(Xserver);
    }
}
(() => {
    return new Xserver();
})();