import { Player } from './controllers/player';


import { Server, MethodusConfig, MethodusClassConfig, MethodType, ServerType } from '../index';

async function init()
{
    let config = new MethodusConfig();
    config.run(ServerType.Express, { port: process.env.PORT || 8020 });
    config.use(Player, MethodType.Local,ServerType.Express)
    //config.use(Player, MethodType.MQ)
    //config.classes.set('TestClass', new MethodusClassConfig('TestClass', MethodType.Http));
    const server = await new Server(process.env.PORT || 8020).configure(config).start();
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
}

init();
