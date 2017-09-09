import { JsonPlaceHolder } from './controllers/json-placeholder';
import { ServerConfig, ClientConfig, ConfiguredServer, MethodType, ServerType } from '../index';


@ServerConfig(ServerType.Express, { port: process.env.PORT || 8020 })
@ClientConfig(JsonPlaceHolder, MethodType.Http, 'https://jsonplaceholder.typicode.com/')
class SetupServer extends ConfiguredServer {

}
new SetupServer();
console.log(`
--------------------------------------------------------------------------------------------
every thing is ready, your server is active at: 
http://127.0.0.1:${process.env.PORT || 8020}/api/player


try browsing to
http://127.0.0.1:${process.env.PORT || 8020}/api/player/1
`)



