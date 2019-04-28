export class ServerContainer {
    server: any;
    constructor(serverInformation: any, parentServer: any) {
        this.server = require(serverInformation.type.path);

        // if (serverInformation.type.servername) {
        //     this.server = serverInformation.type;
        // } else {
        //     this.server = require(serverInformation.type.path);
        // }
        this.server.register(serverInformation, parentServer);
        return this.server;
    }
}
