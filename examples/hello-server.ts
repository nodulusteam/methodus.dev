import { Player } from './controllers/player';
import { Room } from './controllers/room';
import { School } from './controllers/school';

import { ServerType,Server, MethodulusConfig, MethodulusClassConfig, MethodType } from '../index';




let config = new MethodulusConfig();
config.run(ServerType.Express, {port:process.env.PORT || 8020 });
config.use(Player, MethodType.Local, 'http://localhost:8090')
//config.classes.set('TestClass', new MethodulusClassConfig('TestClass', MethodType.Http));
const server = new Server(process.env.PORT || 8020).configure(config).start();
//server.useClass(Player);


setTimeout(() => {

    console.log(`
--------------------------------------------------------------------------------------------
every thing is ready, your server is active at: 
http://localhost:${process.env.PORT || 8020}/api/player
http://localhost:${process.env.PORT || 8020}/api/room
http://localhost:${process.env.PORT || 8020}/api/school


try browsing to
http://localhost:${process.env.PORT || 8020}/api/player/1
http://localhost:${process.env.PORT || 8020}/api/room/1
http://localhost:${process.env.PORT || 8020}/api/school/1
`)


}, 2000)
