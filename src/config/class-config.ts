
import { logger, LogClass } from '../log';
import { MethodType, ServerType, TransportType } from '../interfaces';

@LogClass(logger)
export class MethodusClassConfig {
    public methodType: MethodType = MethodType.Local;
    public serverType: ServerType;
    public classType: any;
    public serviceName: string;
    public resolver: Promise<string> | string | any;
    constructor(classType: any, methodType: MethodType,
        serverType: ServerType, resolver?: Promise<any> | any) {
        this.classType = classType;
        this.methodType = methodType;
        this.serverType = serverType;
        this.resolver = () => {
            return resolver;
        };
    }
}
