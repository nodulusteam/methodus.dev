import { ParamsMap, Verbs } from '../commons';
let socket: any = null;
export class Socket {

    public static interceptor: (options: any) => {} | undefined;
    public options: any = {};
    public socket: any;
    public io: any;
    constructor() {

        this.io = (window as any).io;
        if (!this.io) {
            console.warn('not implemented');


        }
        if (!socket) {
            this.socket = socket = this.io('/', { nsp: '/' }).connect();
        } else {
            this.socket = socket;
        }
    }

    public static intercept(interceptor: (options: any) => {}) {

    }



    public parse(verb: Verbs, paramsMap: ParamsMap[], args: any[]) {

    }

    public async send(messageName: string, parameters: any) {
        this.socket.emit(messageName, parameters, (data: any) => {

        });
    }


    public async execute() {

    }
}
