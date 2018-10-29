import { MethodusConfig, PluginEntry } from './config';

export class PluginLoader {
    config(serverConfiguration: MethodusConfig, pluginList: PluginEntry[]) {
        console.log('> Configuring plugins:');
        pluginList.forEach((plugin) => {
            try {
                console.log(`> Plugin name:${plugin.name}`);
                const pluginModule = require(plugin.name);
                pluginModule.init(serverConfiguration, plugin.options);
            } catch (error) {
                console.error(error);
            }
        });
    }
}
