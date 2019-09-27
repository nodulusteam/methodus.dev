
import {  ServerType } from '../interfaces';

/**
 * @hidden
 */
export class ServerConfig {
    instanceId?: string;
    type: ServerType | any;
    options: any;
    onStart?: () => {};
    constructor(type: ServerType, options?: any) {
        this.type = type;
        this.options = options;
        if (options) {
            this.onStart = options.onStart;
        }
    }
}
