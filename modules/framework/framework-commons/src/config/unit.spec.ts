import { MethodusConfig } from './config';
import { MethodusClassConfig } from './class-config';
import { MethodType, ServerType, TransportType } from '../interfaces';
import { MethodusClientConfig } from './client-config';
import { ServerConfig } from './server-config';

class TestClass {
    constructor() { }
}
describe('Test additional method classes', () => {
    it('MethodusConfig', async () => {
        const config = new MethodusConfig(undefined, undefined);

        expect(config).toBeDefined();
    });

    it('MethodusConfig', async () => {
        const config = new MethodusConfig([], new Map<string, MethodusClassConfig>());
        config.use(TestClass, MethodType.Http, ServerType.Custom, () => 'http://localhost');
        config.useClient(TestClass, TransportType.Http, () => 'http://localhost');

        try{
            config.use(TestClass, MethodType.Http, ServerType.Custom);
            config.useClient(TestClass, TransportType.Http);
        }catch(error){
            
        }
    
        expect(config).toBeDefined();
    });
});

describe('Test additional method classes', () => {
    it('MethodusClassConfig', async () => {
        const config = new MethodusClassConfig(TestClass, MethodType.Http, ServerType.Custom, '');
        config.resolver();
        expect(config).toBeDefined();
    });

    it('MethodusClientConfig', async () => {
        const config = new MethodusClientConfig(TestClass, TransportType.Http, '');
        config.resolver();
        expect(config).toBeDefined();
    });

    it('ServerConfig', async () => {
        let config = new ServerConfig(TestClass, { onStart: 'go' });
        config = new ServerConfig(TestClass);
        expect(config).toBeDefined();
    });


});