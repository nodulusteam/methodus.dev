export class ClientContainer {
    client: any;
    constructor(clientInformation: any) {
        if (clientInformation.path) {
            this.client = require(clientInformation.path);
        } else {
            this.client = clientInformation;
        }
        return this.client;
    }
}
