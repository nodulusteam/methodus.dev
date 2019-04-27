import { Player } from './controllers/player';
import { RouterConfiguration, ServerConfiguration, ConfiguredServer, ServerType } from '../index';

@ServerConfiguration(ServerType.Express, { port: process.env.PORT || 8020 })
@RouterConfiguration(Player, ServerType.Express)
// @ClientConfiguration(Player, MethodType.Local, ServerType.Express)
class SetupServer extends ConfiguredServer {

}

new SetupServer();
