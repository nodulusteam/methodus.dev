import * as uuidv1 from 'uuid/v1';
import { MethodEvent, MethodError } from '../response/';

import { ServerType } from '../interfaces';

export class ServersList {
    public instances: any = {};
    public classes: any;
    public clients: any;
    constructor() {
        this.classes = {};
        this.instances = {};
        this.clients = {};
    }
    public addServer(server: any) {
        const id = uuidv1();
        this.instances[id] = server;
        return id;
    }
    public set(instanceId: any, serverType: any, instance: any) {
        this.instances[instanceId][serverType] = instance;
        return instance;
    }
    public get(instanceId: any, serverType?: any) {
        if (serverType) {
            return this.instances[instanceId][serverType];
        } else {
            return this.instances[instanceId];
        }
    }

    public async  emit(methodEvent: MethodEvent) {
        for (const instanceKey in this.instances) {
            if (this.instances[instanceKey][methodEvent.serverType]) {
                const result = this.instances[instanceKey][methodEvent.serverType]._sendEvent(methodEvent);
                return result;
            }
        }
    }

    public send(server: any, functionArgs: any, methodus: any, paramsMap: any, securityContext: any) {
        // if (this.instances && Object.keys(this.instances).length) {
        //     for (const instanceKey in this.instances) {
        //         if (this.instances[instanceKey][server]) {
        //             const result = this.instances[instanceKey][server]._send(functionArgs,
        //                 methodus, paramsMap, securityContext);
        //             return result;
        //         }
        //     }
        // } else {
        //     if (server === ServerType.Express ) {
        //         const request = new Request();
        //         const baseUrl = methodus.resolver();
        //         if (baseUrl) {
        //             return request.sendRequest(methodus.verb, baseUrl + methodus.route, functionArgs,
        //                 paramsMap, securityContext);
        //         } else {
        //             return new MethodError('no server found for this method' + methodus.route, 302);
        //         }
        //     }
        // }

    }
}

if (!(global as any).METHODUS_BRIDGE) {

    (global as any).METHODUS_BRIDGE = new ServersList();
}

export const Servers = (global as any).METHODUS_BRIDGE;
