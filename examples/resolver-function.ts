import { Player } from './controllers/player';
import { Server, MethodulusConfig, MethodulusClassConfig, MethodType } from '../index';

let config = new MethodulusConfig(['express']);

let resolver = (name) => {
    console.log(name);
    return Promise.resolve('http://localhost:8090');
}

config.use(Player, MethodType.Http, resolver)
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
