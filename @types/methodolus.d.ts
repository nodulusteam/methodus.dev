declare module NodeJS {
    interface Global {
        methodulus: Methodulus.Main;
    }
}
declare module Methodulus {
    interface Main {
        server: Server;
    }
    interface Server {
        _send(channel: any, functionArgs: any, message: any, paramsMap?: any): any;
    }
}
