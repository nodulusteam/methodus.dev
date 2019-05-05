export class ServerContainer {
    server: any;
    constructor(serverInformation: any, parentServer: any) {

        if (serverInformation.type.path) {
            this.server = require(serverInformation.type.path);
        } else {
            this.server = serverInformation.type;
        }

        this.server.register(serverInformation, parentServer);
        return this.server;
    }
}
