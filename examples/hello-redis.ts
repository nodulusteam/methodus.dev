import { Player } from './controllers/player';
import { ServerType, Server, MethodulusConfig, MethodulusClassConfig, MethodType } from '../index';


const redis_addr = '//192.168.99.100:32768';


let config = new MethodulusConfig()

 
config.run(ServerType.Redis, {client: redis_addr, server: redis_addr});
config.use(Player, MethodType.Local, 'http://localhost:8090')
//config.classes.set('TestClass', new MethodulusClassConfig('TestClass', MethodType.Http));
const server = new Server(process.env.PORT || 8020).configure(config).start();
//server.useClass(Player);


setTimeout(() => {

    console.log(`
--------------------------------------------------------------------------------------------
every thing is ready, your server is active at: 
http://localhost:${process.env.PORT || 8020}/api/player


try browsing to
http://localhost:${process.env.PORT || 8020}/api/player/1
`)


}, 2000)
