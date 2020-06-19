declare module NodeJS {
    interface Global {
        methodus: Methodus.IMethodus;

    }
}


declare module Methodus {
    export interface IMethodus {
        config: {

        };
    }
}
