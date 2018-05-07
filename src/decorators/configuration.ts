import { MethodType } from "../";




export class ConfigHelper {
    static get(entryName: string) {
        if ((global as any).methodus) {
            const config = (global as any).methodus.config;
            if (config && config.tiles && config.tiles[entryName]) {
                return config.tiles[entryName];
            }
        }

        return null;
    }
}

