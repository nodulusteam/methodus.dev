import { EmitterPlugin } from './tests/servers/emitter.plugin';
import { Server } from './server';
import { MethodusConfig } from '.';
import * as path from 'path';

// new EmitterPlugin();

// describe('Test the FP functions', () => {

//     it('maybeJson', async () => {

//         expect(server).not.toBeNull();
//     });
// });


// const server = new ServerContainer({ type: { path: path.join(process.cwd(), 'build/tests/servers/emitter.plugin') } }, null);
// console.log(server);

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
        const plugin: any = { type: { path: path.join(process.cwd(), 'build/tests/servers/emitter.plugin') } };
        server.config = new MethodusConfig();
        server.config.run(plugin, {});
        server.start();
        expect(true).toBe(true);
    });
});


