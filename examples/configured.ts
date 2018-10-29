process.env.test = 'true';
import * as path from 'path';

import {
    ServerConfiguration, PluginConfiguration,
    ClientConfiguration, ConfiguredServer, MethodType, ServerType,
} from '../';
import { FirstClass } from '../src/tests/classes/FirstClass';
import { SecondClass } from '../src/tests/classes/SecondClass';

@ServerConfiguration(ServerType.Express, { port: process.env.PORT || 6695 })
@PluginConfiguration(path.join(__dirname, 'static'), { path: '/static/' })
@ClientConfiguration(FirstClass, MethodType.Local, ServerType.Express)
@ClientConfiguration(SecondClass, MethodType.Local, ServerType.Express)
export class Xserver extends ConfiguredServer {
    constructor() {
        super(Xserver);
    }
}

new Xserver();
