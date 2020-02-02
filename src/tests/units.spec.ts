import { MethodusConfig, MethodusClassConfig } from '../config';

describe('Test additional method classes', () => {
    it('MethodusConfig', async () => {
        const config = new MethodusConfig(undefined, undefined);
        expect(config).toBeDefined();
    });

    it('MethodusConfig', async () => {
        const config = new MethodusConfig([], new Map<string, MethodusClassConfig>());
        expect(config).toBeDefined();
    });
});
