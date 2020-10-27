import { v1 as uuidv1 } from 'uuid';
import { Dictionary, ServerDefinition } from '@methodus/framework-decorators/commons';

export class ServersList {
    public instances: Dictionary = {};
    public classes: Dictionary;
    public clients: Dictionary;
    public serversArray: any[];
    constructor() {       
        this.classes = {};
        this.instances = {};
        this.clients = {};
        this.serversArray = [];
    }
    public addServer(server: ServerDefinition) {
        const id = uuidv1();
        this.instances[id] = server;
        return id;
    }
    public set(instanceId: string, serverType: string, instance: any) {
        this.instances[instanceId][serverType] = instance;
        this.serversArray.push(instance);
        return instance;
    }
    public get(instanceId: string, serverType?: string) {
        if (serverType) {
            return this.instances[instanceId][serverType];
        } else {
            return this.instances[instanceId];
        }
    }
    public reset() {
        this.instances = {};
        this.serversArray = [];
        (global as any).METHODUS_BRIDGE = new ServersList();

    }

}

if (!(global as any).METHODUS_BRIDGE) {
    (global as any).METHODUS_BRIDGE = new ServersList();
}

export const Servers = (global as any).METHODUS_BRIDGE;
