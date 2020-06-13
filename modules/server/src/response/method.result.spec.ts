
import injection from '@methodus/framework-injection';
import { MethodHandler } from '../method/handlers/default'
import * as fs from 'fs';
import { MethodResult } from './method.result';
import { MethodConfig, Method } from '@methodus/framework-decorators';

new MethodHandler();

@MethodConfig('TestController')
class TestController {
    @Method('post', '/route', [])
    public list() { }
}

describe('Test MethodResult', () => {
    beforeAll(() => {
        const handler = injection.Injector.get<MethodHandler>('MethodHandler');
        console.log(handler);
    });
    it('createNew', async () => {
        const result = new MethodResult({ prop1: 1, prop2: 2 });
        expect(result).not.toBeNull();
    });


    it('createNew', async () => {
        const result = new MethodResult({ prop1: 1, prop2: 2 });
        result.linkAction('list', TestController, 'my-rel', {}, 'www.com');
        const linksResult = result.apply();
        expect(linksResult.result).not.toBeNull();
        expect(linksResult.getLinks()).not.toBeNull();
    });


    it('createNew', async () => {
        const result = new MethodResult({ prop1: 1, prop2: 2 }, 100, 1);
        result.linkAction('list', TestController, 'my-rel', {}, 'www.com');
        const linksResult = result.apply();
        expect(linksResult.result).not.toBeNull();
        expect(linksResult.getLinks()).not.toBeNull();
    });


    it('readStream', async () => {
        const readStream = fs.createReadStream(__filename);
        const result = new MethodResult(readStream);
        expect(result).not.toBeNull();
    });
});

