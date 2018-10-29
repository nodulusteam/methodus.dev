import { Player } from './controllers/player';
import { ServerType, Server, MethodusConfig, MethodType } from '../index';

let config = new MethodusConfig();
config.run(ServerType.Express, { port: process.env.PORT || 8020 });
let resolver = (name) => {
    console.log(name);
    return Promise.resolve('http://localhost:8090');
}

config.use(Player, MethodType.Http, ServerType.Express, resolver)
//config.classes.set('TestClass', new MethodusClassConfig('TestClass', MethodType.Http));
new Server(process.env.PORT || 8020).configure(config).start();
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
