import { MethodType } from "../";




export class ConfigHelper {
    static get(entryName: string) {
        const config = (global as any).tmla.config;
        if (config && config.tiles && config.tiles[entryName]) {
            return config.tiles[entryName];
        }
        return null;
    }
}

