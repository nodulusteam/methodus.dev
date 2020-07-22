import { MethodusConfig } from "./config";
import { MethodusClassConfig } from "./class-config";

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
