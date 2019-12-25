
import { MethodResult } from './method.result';
import { TestController } from '../tests/controllers/controller.test';
import * as fs from 'fs';

describe('Test MethodResult', () => {

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

