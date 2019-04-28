export class ClientContainer {
    client: any;
    constructor(clientInformation: any) {
        this.client = require(clientInformation.path);
        return this.client;
    }
}
