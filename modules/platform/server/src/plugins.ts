import commons from '@methodus/framework-commons';
const logger = commons.logger;
import { MethodusConfig, PluginEntry } from '@methodus/framework-commons';
export class PluginLoader {

    constructor() {

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
