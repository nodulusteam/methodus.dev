import {
    decoratorsModule as decorators, ConfiguredServer
} from '@methodus/server';
import { Express } from '@methodus/platform-express';

@decorators.Module('AppModule')
@decorators.ServerConfiguration(Express, { port: 3060 })
export class AppModule extends ConfiguredServer {
    
}
