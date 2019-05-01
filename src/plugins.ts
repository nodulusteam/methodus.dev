import { MethodusConfig, PluginEntry } from './config';

export class PluginLoader {
    async config(serverConfiguration: MethodusConfig, pluginList: PluginEntry[]) {
        console.log('> Configuring plugins:');
        for (const plugin of pluginList) {
            try {
                console.log(`> Plugin name:${plugin.name}`);
                const pluginModule = require(plugin.name);
                await pluginModule.init(serverConfiguration, plugin.options);
            } catch (error) {
                console.error(error);
            }
        }
    }
}
