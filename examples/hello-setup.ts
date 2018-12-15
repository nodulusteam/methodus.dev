import { Player } from './controllers/player';
import { ServerConfiguration, ClientConfiguration, ConfiguredServer, MethodType, ServerType } from '../index';

@ServerConfiguration(ServerType.Express, { port: process.env.PORT || 8020 })
@ClientConfiguration(Player, MethodType.Local, ServerType.Express)
class SetupServer extends ConfiguredServer {

}

new SetupServer();
