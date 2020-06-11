/**
 * @hidden
 */
export class ClientContainer {
    client: any;
    constructor(clientInformation: any) {
        if (clientInformation.path) {
            this.client = require(clientInformation.path);
        } else if (clientInformation.class) {
            this.client = clientInformation.class;
        } else {
            this.client = clientInformation;
        }
        return this.client;
    }
}
