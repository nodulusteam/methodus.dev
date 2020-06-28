import { EventEmitter } from "events";

export class Logger extends EventEmitter {
    constructor(public namespace?: string, public debugInstance?: Function) {
        super();
    }
    log(...args) {
        if (this.namespace) {
            if (this.debugInstance) {
                this.debugInstance(args);
            }

            this.emit('message', ['trace', this.namespace, ...args]);
        }
    }

    info(...args) {
        if (this.debugInstance) {
            this.debugInstance(args);
        }

        this.emit('message', ['info', this.namespace, ...args]);
    }


    error(...args) {
        if (this.debugInstance) {
            this.debugInstance(args);
        }
        this.emit('message', ['error', this.namespace, ...args]);


    }


}