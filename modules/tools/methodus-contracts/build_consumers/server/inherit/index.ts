
import {
    ServerConfiguration, PluginConfiguration,
    ClientConfiguration, ConfiguredServer, MethodType, ServerType,
} from '@methodus/server';
const URL = 'http://localhost:6200';
const HTTP = 'Http';

(global as any).methodus = {
    config: {
        Inherit: { transport: HTTP, resolver: URL },
        Inherit2: { transport: HTTP, resolver: URL },
        BaseController: { transport: HTTP, resolver: URL },
    },
};
import { Inherit, Inherit2 } from '@server/inherit';

@ServerConfiguration(ServerType.Express, { port: process.env.PORT || 6690 })
@ClientConfiguration(Inherit, MethodType.Http, URL)
@ClientConfiguration(Inherit2, MethodType.Http, URL)
// @PluginConfiguration('@methodus/describe')
class SetupServer extends ConfiguredServer {
    constructor() {
        super(SetupServer);
    }
}

(async () => {
    // tslint:disable-next-line:no-unused-expression
    new SetupServer();
    setTimeout(async () => {
        console.log('calling inherit contract');
        try {
            const result = await Inherit.get('1111');
            console.log(result);
        } catch (error) {
            console.error(error);
        }

        try {
            console.log('calling inherit2 contract');
            const result2 = await Inherit2.get('2222');
            console.log(result2);
        } catch (error) {
            console.error(error);
        }
        process.exit(0);
    }, 1000);
})();
