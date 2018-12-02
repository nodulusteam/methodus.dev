
export class ConfigHelper {
    static get(entryName: string) {
        if ((global as any).methodus) {
            const config = (global as any).methodus.config;
            if (config && config[entryName]) {
                return config[entryName];
            }
        }
        return null;
    }
}
