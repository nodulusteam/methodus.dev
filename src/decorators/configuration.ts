
export class ConfigHelper {
    static get(entryName: string) {
        if (global.methodus) {
            const config = global.methodus.config;
            if (config && config[entryName]) {
                return config[entryName];
            }
        }
        return null;
    }
}
