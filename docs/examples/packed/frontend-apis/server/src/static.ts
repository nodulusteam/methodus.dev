import * as path from 'path';
import { MethodusConfig, Server } from '@methodus/server';
import { Response } from 'express-serve-static-core';
import { Express } from '@methodus/platform-express';

export function init(config: MethodusConfig, pluginOptions: any) {
    config.run(Express, {
        onStart: (instance: any) => {
            const options = {
                etag: true,
                extensions: ['woff', 'woff2', 'ttf', 'eot'],
                index: ['index.html', 'player.html', 'admin.html'],
                maxAge: '1d',
                redirect: false,
                setHeaders: (res: Response) => {
                    res.set('x-timestamp', Date.now().toString());
                },
            };
            const clientDir = path.resolve(path.join(__dirname, '..', pluginOptions.clientPath));
            instance.use(pluginOptions.path, Express.static(clientDir, options));
        },
    });
    return config;
}
