import * as M from '../../lib/index';

@M.MethodConfig('SocketController')
export class SocketController {

    activeSockets: any[] = new Array<any>();

    @M.Method(M.Verbs.Get, '/connect')
    public async connect(socket: any): Promise<M.MethodResult> {
        this.activeSockets.push(socket);
        return new M.MethodResult({});
    }
}