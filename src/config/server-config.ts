
import { ServerDefinition } from '../decorators';

/**
 * @hidden
 */
export class ServerConfig {
    instanceId?: string;
    type: ServerDefinition;
    options: any;
    onStart?: () => {};
    constructor(type: ServerDefinition, options?: any) {
        this.type = type;
        this.options = options;
        if (options) {
            this.onStart = options.onStart;
        }
    }
}
