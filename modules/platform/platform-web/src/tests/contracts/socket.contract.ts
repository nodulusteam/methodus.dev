import * as M from '../../lib/index';
const activeSockets: any = [];

@M.MethodConfig('SocketController')
export class SocketController {
    @M.Method(M.Verbs.Get, '/connect')
    public async connect(socket: any): Promise<M.MethodResult> {
        activeSockets.push(socket);
        return new M.MethodResult({});
    }
}