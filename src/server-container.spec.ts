import { EmitterPlugin } from './tests/servers/emitter.plugin';
import { Server } from './server';

import * as path from 'path';
import { MethodusConfig } from './shim';


const server = new Server();

describe('server containers', () => {

    it('EmitterPlugin type', async () => {
        const plugin: any = { type: new EmitterPlugin() };
        server.config = new MethodusConfig();
        server.config.run(plugin, {});
        server.start();
        expect(true).toBe(true);
    });

    it('EmitterPlugin path', async () => {
        const plugin: any = { type: { path: path.join(process.cwd(), 'lib/tests/servers/emitter.plugin') } };
        server.config = new MethodusConfig();
        server.config.run(plugin, {});
        server.start();
        expect(true).toBe(true);
    });
});
