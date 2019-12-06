import { ProxiedClass } from './test/proxy.test';

describe('Test Proxy decorator', () => {
    it('createNew', async () => {
        const result = new ProxiedClass();
        expect(result).not.toBeNull();
    });
});
