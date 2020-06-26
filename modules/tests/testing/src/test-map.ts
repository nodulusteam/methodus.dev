export class TestMap {

    constructor(options?: TestMap) {
        if (options) {
            this.controllers = (options.controllers) ? options.controllers : [];
            this.providers = (options.providers) ? options.providers : [];
        }

    }
    public controllers?: any[];
    public providers?: any[];
}