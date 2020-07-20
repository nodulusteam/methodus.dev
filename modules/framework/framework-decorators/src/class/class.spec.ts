import { RouterConfiguration } from './router';
import { ClientConfiguration } from './client';
import { PluginConfiguration } from './plugin';
import { ServerConfiguration } from './server';

@PluginConfiguration('SomePlugin')
@ClientConfiguration(TestAll, 'Http')
@RouterConfiguration(TestAll, 'SomeServer')
@ServerConfiguration('Express', {})
class TestAll {
}


 

describe('Class decorators', () => {
    it('Create class', () => {
        const module = new TestAll();
        expect(module).toBeDefined();
    });
});
