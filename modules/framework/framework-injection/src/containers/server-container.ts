import * as path from 'path';
/**
 * @hidden
 */
export class ServerContainer {
    server: any;
    constructor(serverInformation: any, parentServer: any) {
        if (serverInformation.type.path) {
            this.server = require(path.join(serverInformation.type.path));
        } else if (serverInformation.type.module) {
            this.server = serverInformation.type.module;
        } else {
            this.server = serverInformation.type;
        }

        this.server.register(serverInformation, parentServer);
        return this.server;
    }
}
