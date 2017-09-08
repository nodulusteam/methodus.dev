export class _Container {
    /**
     *
     */
    constructor() {
        this._deps = new Map<string, any>();

    }
    _deps: Map<string, any>;
    public set<T>(name: string, dep: any) {
        this._deps.set(name, dep);
    }
    public get<T>(name: string) {
        return this._deps.get(name);
    }
}


process.env.test = true;


export const Container = new _Container();

if (process.env.test) {
    Container.set('amqplib', require('../tests/amqplib-mocks'))
    Container.set('kafka-node', require('../tests/kafka-mocks'))
    Container.set('redis', require('../tests/redis-mocks'))
}
else {
    Container.set('amqplib', require('amqplib'))
    Container.set('kafka-node', require('kafka-node'))
    Container.set('redis', require('redis'))
    
}