import { Decorators as ClientConfigurationNS } from './client';
import { Decorators as PluginConfigurationNS } from './plugin';
import { Decorators as ServerConfigurationNS } from './server';
import { Decorators as RouterConfigurationNS  } from './router';

export * from './module';
export * from './proxy/proxy';
export * from './client';
export * from './auth';

 
/**
 * @hidden
 */
export const ClientConfiguration = ClientConfigurationNS.ClientConfiguration;
/**
 * @hidden
 */
export const PluginConfiguration = PluginConfigurationNS.PluginConfiguration;
/**
 * @hidden
 */
export const ServerConfiguration = ServerConfigurationNS.ServerConfiguration;
/**
 * @hidden
 */
export const RouterConfiguration = RouterConfigurationNS.RouterConfiguration;