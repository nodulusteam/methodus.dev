import { logger, Log, LogClass } from '../log/';
import { Servers } from '../servers'

@LogClass(logger)
export class MethodEvent {
    name: string;
    value: any;

    constructor(name: string, value: any) {
        this.value = value;
        this.name = name;
        Servers.emit(this);
    }

}