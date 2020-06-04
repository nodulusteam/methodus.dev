import { logger } from '@methodus/framework-commons';
import { MethodusConfig, PluginEntry } from './config';
export class PluginLoader {

    constructor() {
        debugger;

    }
    async config(serverConfiguration: MethodusConfig, pluginList: PluginEntry[]) {
        logger.info('> Configuring plugins:');
        for (const plugin of pluginList) {
            try {
                logger.info(`> Plugin name:${plugin.name}`);
                const pluginModule = require(plugin.name);
                await pluginModule.init(serverConfiguration, plugin.options);
            } catch (error) {
                logger.error(error);
            }
        }
    }
}
