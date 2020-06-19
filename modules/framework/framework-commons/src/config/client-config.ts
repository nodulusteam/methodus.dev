import { TransportType } from "../interfaces";

/**
 * @hidden
 */
export class MethodusClientConfig {
    public transportType: any;
    public classType: any;
    public serviceName?: string;
    public resolver: Promise<string> | string | any;
    constructor(classType: any, transportType: TransportType,
        resolver?: Promise<any> | any) {
        this.classType = classType;
        this.transportType = transportType;

        this.resolver = () => {
            return resolver;
        };
    }
}
