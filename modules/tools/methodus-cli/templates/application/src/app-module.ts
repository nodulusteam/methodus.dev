import {
    Module,
    ServerConfiguration,
    ConfiguredServer,
} from '@methodus/server';
import { Express } from '@methodus/platform-express';

@Module('AppModule')
@ServerConfiguration(Express, { port: 3060 })
export class AppModule extends ConfiguredServer {
    
}
