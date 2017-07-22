const yaml = require('js-yaml'),
    fs = require('fs');

import { MethodType } from './method';



export class MethodulusClassConfig implements Methodulus.IMethodulusClassConfig {
    /**
     *
     */
    constructor(classType: any, methodType: MethodType, resolver: Function | string) {
        this.classType = classType;
        this.methodType = methodType;
        this.resolver = () => {
            if (typeof resolver === 'string') {
                return Promise.resolve(resolver);
            }
        }

    }
    public methodType: string = MethodType.Local;
    public classType: any;
    public resolver: Function | string
}

export class MethodulusConfig implements Methodulus.IMethodulusConfig {
    constructor(servers: string[], map?: Map<string, MethodulusClassConfig>) {
        this.servers = servers;
        if (map)
            this.classes = map;
    }
    public classes: Map<string, Methodulus.IMethodulusClassConfig> = new Map<string, Methodulus.IMethodulusClassConfig>();
    public servers: string[] = ['rest'];
    public port: number;
    public use(classType: any, methodType: MethodType, resolver: Function | string) {
        this.classes.set(classType.name, new MethodulusClassConfig(classType, methodType, resolver));
    }
}


export function MethodulusConfigFromFile(configPath) {
    var doc = yaml.safeLoad(fs.readFileSync(configPath, 'utf8'));
    return doc;
}