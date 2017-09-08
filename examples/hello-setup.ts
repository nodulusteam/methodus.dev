import { Player } from './controllers/player';
import { ServerConfig, ClientConfig, ConfiguredServer, MethodulusConfig, MethodulusClassConfig, MethodType, ServerType } from '../index';

@ServerConfig(ServerType.Express, { port: process.env.PORT || 8020 })
@ClientConfig(Player, MethodType.Local)
class SetupServer extends ConfiguredServer {

}

let s = new SetupServer();
