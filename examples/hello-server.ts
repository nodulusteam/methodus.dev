import { Player } from './player';
import { Server, MethodType, MethodulusConfig } from '../index';


//MethodulusConfig.config['TestClass'] = MethodType.Http;
MethodulusConfig.servers = ['rest'];
const server = new Server(process.env.PORT || 8020);
server.useClass(Player);
