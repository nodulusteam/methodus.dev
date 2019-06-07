process.env.test = 'true';
import * as path from 'path';

import {
    ServerConfiguration, RouterConfiguration,
    ClientConfiguration, ConfiguredServer,
} from '../shim';
import { TestController } from '../controllers/';
import { TestTarget } from '../controllers/';
import { EmitterPlugin } from './emitter.plugin';
import { PluginConfiguration } from '../shim';

const ServerPlugin = new EmitterPlugin();
/**
 * @ignore
 */
@PluginConfiguration(path.join(__dirname, 'simple.plugin'))
@ServerConfiguration(ServerPlugin, {})
@RouterConfiguration(TestController, ServerPlugin.name)
@ClientConfiguration(TestTarget, ServerPlugin)
export class EmitterTestServer extends ConfiguredServer {
    constructor() {
        super(EmitterTestServer);
    }
}
