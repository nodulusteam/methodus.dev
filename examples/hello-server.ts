import { Player } from './controllers/player';
import { Server, MethodType, MethodulusConfig } from '../index';


//MethodulusConfig.config['TestClass'] = MethodType.Http;
MethodulusConfig.servers = ['rest'];
const server = new Server(process.env.PORT || 8020);
server.useClass(Player);


setTimeout(() => {

    console.log(`
--------------------------------------------------------------------------------------------
every thing is ready, your server is active at: 
http://localhost:${process.env.PORT || 8020}/api/player


try browsing to
http://localhost:${process.env.PORT || 8020}/api/player/1
`)


}, 2000)
