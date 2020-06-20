import { v1 as uuidv1 } from 'uuid';
import { Dictionary, ServerDefinition } from '@methodus/framework-commons';

export class ClientList {
    public instances: Dictionary = {};

    public clients: Dictionary;
    public serversArray: any[];
    constructor() {
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
        (global as any).METHODUS_BRIDGE = new ClientList();
    }
}

if (!(global as any).METHODUS_BRIDGE) {
    (global as any).METHODUS_BRIDGE = new ClientList();
}

export const Clients = (global as any).METHODUS_BRIDGE;
