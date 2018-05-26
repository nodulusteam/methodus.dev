
const uuidv1 = require('uuid/v1');
import { MethodEvent, MethodError } from '../response/'


import { Request } from '../servers/express/Request';
import { MethodType, ServerType } from '../interfaces';


export class ServersList {
    public instances: any = {};
    public classes: any;
    constructor() {
        this.classes = {};
        this.instances = {};

    }
    public addServer(server) {
        let id = uuidv1();
        this.instances[id] = server;
        return id;
    }
    public set(instanceId, serverType, instance) {
        this.instances[instanceId][serverType] = instance;
        return instance;
    }
    public get(instanceId, serverType?) {
        if (serverType)
            return this.instances[instanceId][serverType];
        else
            return this.instances[instanceId];
    }



    public async  emit(methodEvent: MethodEvent) {
        for (let instanceKey in this.instances) {
            if (this.instances[instanceKey][methodEvent.serverType]) {
                const result = this.instances[instanceKey][methodEvent.serverType]._sendEvent(methodEvent);
                return result;
            }
        }
    }

    public send(server, functionArgs, methodus, paramsMap, securityContext?) {
        if (this.instances && Object.keys(this.instances).length) {
            for (let instanceKey in this.instances) {
                if (this.instances[instanceKey][server]) {
                    const result = this.instances[instanceKey][server]._send(functionArgs, methodus, paramsMap, securityContext);
                    return result;
                }
            }
        } else {
            if (server === ServerType.Express || server === ServerType.ExpressPartial) {
                const request = new Request();



                let baseUrl = methodus.resolver();
                if (baseUrl) {
                    return request.sendRequest(methodus.verb, baseUrl + methodus.route, functionArgs, paramsMap, securityContext);
                } else {
                    return new MethodError('no server found for this method' + methodus.route, 302);
                }
            }
        }

    }
}



if (!(global as any).METHODUS_BRIDGE) {

    (global as any).METHODUS_BRIDGE = new ServersList();
}

export const Servers = (global as any).METHODUS_BRIDGE;
