import * as uuidv1 from 'uuid/v1';

export class ServersList {
    public instances: any = {};
    public classes: any;
    public clients: any;
    public _app: any;
    public serversArray: any [];
    constructor() {
        this.classes = {};
        this.instances = {};
        this.clients = {};
        this.serversArray = [];
    }
    public addServer(server: any) {
        const id = uuidv1();
        this.instances[id] = server;
        return id;
    }
    public set(instanceId: any, serverType: any, instance: any) {
        this.instances[instanceId][serverType] = instance;
        this.serversArray.push(instance);
        return instance;
    }
    public get(instanceId: any, serverType?: any) {
        if (serverType) {
            return this.instances[instanceId][serverType];
        } else {
            return this.instances[instanceId];
        }
    }

}

if (!(global as any).METHODUS_BRIDGE) {

    (global as any).METHODUS_BRIDGE = new ServersList();
}

export const Servers = (global as any).METHODUS_BRIDGE;
