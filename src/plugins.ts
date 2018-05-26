import { MethodusConfig, MethodusConfigFromFile, ServerConfig, MethodusClassConfig } from './config';
import { MethodType, ServerType } from './interfaces';

import * as path from 'path';
export class PluginLoader {
    config(serverConfiguration: MethodusConfig, pluginList: string[]) {
        console.log('> Configuring plugins:');
        pluginList.forEach((pluginName) => {
            try {
                console.log(`> Plugin name:${pluginName}`);
                const pluginModule = require(pluginName);
                pluginModule.init(serverConfiguration);
            } catch (error) {
                console.error(error)
            }

        });
    }
}