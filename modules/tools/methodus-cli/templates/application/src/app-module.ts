import {
    Module,
    ServerConfiguration,
    ConfiguredServer,
    PluginConfiguration,
} from '@methodus/server';
import { Express } from '@methodus/platform-express';

@Module('AppModule')
@PluginConfiguration('@methodus/describe')
@ServerConfiguration(Express, { port: 3060 })
export class AppModule extends ConfiguredServer {
    
}
