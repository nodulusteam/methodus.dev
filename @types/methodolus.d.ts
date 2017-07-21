declare module NodeJS {
    interface Global {
        methodulus: Methodulus.Main;
    }
}
declare module Methodulus {
    interface Main {
        server: Server;
        amqp?: any;
    }
    interface Server {
        config: IMethodulusConfig;
        _send(channel: any, functionArgs: any, message: any, paramsMap?: any): any;
    }

    interface IMethodulusConfig {
        classes: Map<string, IMethodulusClassConfig>;
        servers: string[]
        port: number;
    }

    interface IMethodulusClassConfig {
        methodType: any;
        classType: any;
    }

    enum MethodType {
        Local = 'Local',
        Http = 'Http',
        MQ = 'MQ',
        Socket = 'Socket',
    }
    // interface IMethodType {
    //     Local: string;
    //     Http: string;
    //     MQ: string;
    //     Socket: string;
    // }
}
