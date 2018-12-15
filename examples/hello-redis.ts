import { Player } from './controllers/player';
import { ServerType, Server, MethodusConfig, MethodType } from '../index';
const redis_addr = '//192.168.99.100:32771';


let config = new MethodusConfig();

config.run(ServerType.Redis, { client: redis_addr, server: redis_addr });

config.use(Player, MethodType.Local, ServerType.Redis, 'http://localhost:8090')
new Server(8200).configure(config).start();

setTimeout(() => {

    console.log(`
--------------------------------------------------------------------------------------------
every thing is ready, your server is active at:
http://localhost:${process.env.PORT || 8020}/api/player


try browsing to
http://localhost:${process.env.PORT || 8020}/api/player/1
`)


}, 2000)
