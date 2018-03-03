import { Player } from './controllers/player';
import { ServerConfiguration, ClientConfiguration, ConfiguredServer, MethodusConfig, MethodusClassConfig, MethodType, ServerType } from '../index';

@ServerConfiguration(ServerType.Express, { port: process.env.PORT || 8020 })
@ClientConfiguration(Player, MethodType.Local,ServerType.Express)
class SetupServer extends ConfiguredServer {

}

let s = new SetupServer();
