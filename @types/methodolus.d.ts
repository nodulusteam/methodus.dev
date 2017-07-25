declare module NodeJS {
    interface Global {
        methodulus: Methodulus.Main;
    }
}





declare module Methodulus {



    interface Main {
        server: any;
        amqp?: any;
    }

    interface Router
    {


    }
    interface Server {
        sockets?: any;
        useClass(classType: any);
        classRouters: Router[];
        config: IMethodulusConfig;
        _send(channel: any, functionArgs: any, message: any, paramsMap?: any): any;
    }

    interface IMethodulusConfig {
        classes: Map<string, IMethodulusClassConfig>;
        servers?: IServerConfig[]
        port: number;
        
    }

     interface IServerConfig {
          type: Methodulus.ServerType;
          options: any;
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
  enum ServerType
    {
        Express = 'express',
        RabbitMQ = 'amqp',
        Redis= 'redis',
        Socket= 'socketio'
    }
  
    // interface IMethodType {
    //     Local: string;
    //     Http: string;
    //     MQ: string;
    //     Socket: string;
    // }
}
